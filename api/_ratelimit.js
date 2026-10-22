/* global process */
/*
  Rate limits for Pip. (The leading underscore keeps Vercel from turning
  this file into its own /api route.)

  Three ceilings, checked on every message:
    1. Burst:     per visitor, a handful of messages per 10 minutes
    2. Daily:     per visitor, a cap for the whole day
    3. Site-wide: every visitor combined, a hard daily cap on total messages

  The site-wide cap is the one that protects the bill: even if thousands of
  people take the "jailbreak Pip" dare at once, Pip stops after this many
  messages and comes back tomorrow (midnight UTC).

  STORAGE
  Vercel runs several copies ("instances") of a function at once, and each
  has its own memory, so counting in memory alone is easy to dodge. If an
  Upstash Redis database is connected (a small hosted key-value store; free
  tier is plenty), counts are shared across every instance. Without it, this
  falls back to per-instance memory, which still blunts casual spam.

  Visitor IPs are hashed before storage, so no raw IP is ever saved.
*/
import { createHash } from "node:crypto";

const num = (v, d) => (Number.isFinite(Number(v)) && Number(v) > 0 ? Number(v) : d);

export const LIMITS = {
  burst: { max: num(process.env.PIP_BURST_LIMIT, 15), windowSec: 10 * 60 },
  visitorDaily: { max: num(process.env.PIP_VISITOR_DAILY_LIMIT, 60), windowSec: 24 * 60 * 60 },
  siteDaily: { max: num(process.env.PIP_SITE_DAILY_LIMIT, 400), windowSec: 24 * 60 * 60 },
};

// Works with either env var naming that Vercel's Upstash integration uses.
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
export const usingRedis = Boolean(REDIS_URL && REDIS_TOKEN);

const hashIp = ip => createHash("sha256").update(`pip:${ip}`).digest("hex").slice(0, 24);

// Fixed windows: the key changes when the window rolls over, e.g. every 10 minutes.
const windowKey = (name, id, windowSec) => `pip:${name}:${id}:${Math.floor(Date.now() / 1000 / windowSec)}`;

/* ── in-memory fallback ─────────────────────────────────────── */
const mem = new Map();
const memIncr = (key, ttlSec) => {
  const now = Date.now();
  const entry = mem.get(key);
  if (!entry || entry.expires < now) {
    mem.set(key, { count: 1, expires: now + ttlSec * 1000 });
    if (mem.size > 5000) for (const [k, v] of mem) if (v.expires < now) mem.delete(k);
    return 1;
  }
  entry.count += 1;
  return entry.count;
};

/* ── shared Redis counters (Upstash REST API, no extra dependency) ── */
async function redisIncrAll(entries) {
  // One round trip: INCR each key, then set its expiry the first time.
  const commands = entries.flatMap(({ key, ttlSec }) => [["INCR", key], ["EXPIRE", key, String(ttlSec), "NX"]]);
  const res = await fetch(`${REDIS_URL}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, "content-type": "application/json" },
    body: JSON.stringify(commands),
    signal: AbortSignal.timeout(1500),
  });
  if (!res.ok) throw new Error(`redis ${res.status}`);
  const out = await res.json();
  return entries.map((_, i) => Number(out[i * 2]?.result));
}

/*
  Returns null if the message is allowed, or which limit was hit:
  "burst" | "visitorDaily" | "siteDaily".
*/
async function incrAll(entries) {
  if (usingRedis) {
    try {
      const counts = await redisIncrAll(entries);
      if (counts.every(Number.isFinite)) return counts;
    } catch { /* Redis hiccup: fall back to memory rather than taking Pip down */ }
  }
  return entries.map(e => memIncr(e.key, e.ttlSec));
}

export async function checkLimits(ip) {
  const id = hashIp(ip || "anon");

  // Visitor limits first, so one spammer can't burn the whole site's daily budget.
  const visitor = [
    { name: "burst", key: windowKey("burst", id, LIMITS.burst.windowSec), ttlSec: LIMITS.burst.windowSec },
    { name: "visitorDaily", key: windowKey("day", id, LIMITS.visitorDaily.windowSec), ttlSec: LIMITS.visitorDaily.windowSec },
  ];
  const vCounts = await incrAll(visitor);
  const vHit = visitor.find((e, i) => vCounts[i] > LIMITS[e.name].max);
  if (vHit) return vHit.name;

  const site = [{ name: "siteDaily", key: windowKey("site", "all", LIMITS.siteDaily.windowSec), ttlSec: LIMITS.siteDaily.windowSec }];
  const [sCount] = await incrAll(site);
  return sCount > LIMITS.siteDaily.max ? "siteDaily" : null;
}
