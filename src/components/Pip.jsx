/* Pip: a pixel-art portrait of Tonishqa (black leather jacket, curtain bangs).
   Pip is the site's mascot and the face of the chat bot.

   Moods (facial expression only, no body movement; frames snap like real pixel art):
     idle       neutral face, slow blink, an occasional side-eye with one brow lifting
     listening  eyes open a pixel wider, brows lift
     thinking   eyes shift up and to the side, three gold pixels blink
     talking    only the mouth moves
     happy      half-lidded eyes, mouth corners up one pixel, faint blush
     sleeping   eyes closed, small relaxed mouth, pixel Z's drift up and fade

   The portrait is drawn on a 48x48 grid. The static base is merged into one
   <path> per color (a few dozen elements instead of hundreds), computed once. */

const C = {
  sk: "#c98b63", sk2: "#b27552", skh: "#d8a07a", h: "#1c1517", hh: "#3b2b2c",
  j: "#1f1f23", j2: "#3c3c43", j3: "#55555e", t: "#2c2a30", g: "#d9a73e",
  lip: "#a45a4e", lip2: "#c07a68", ir: "#3a2215", w: "#f4ede4", bl: "#d98b7c", dk: "#5a2424",
};
const N = 48;

const BASE = (() => {
  const G = [...Array(N)].map(() => Array(N).fill(null));
  const set = (x, y, c) => { if (x >= 0 && x < N && y >= 0 && y < N) G[y][x] = c; };
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    const top = ((x - 24) / 13) ** 2 + ((y - 20) / 12) ** 2 <= 1;
    const lo = y >= 20 && y <= 44 + ((x * 7) % 3) && x >= 11 - (y - 20) * 0.12 && x <= 37 + (y - 20) * 0.12;
    if (top || lo) set(x, y, C.h);
  }
  [[18,12],[17,13],[16,15],[15,17],[29,11],[31,12],[32,14],[34,22],[35,26],[12,30],[13,34],[36,33],[12,38],[36,40]].forEach(([x, y]) => set(x, y, C.hh));
  for (let y = 38; y < N; y++) for (let x = 0; x < N; x++) if (Math.abs(x - 24) <= 7 + (y - 39) * 3.5) set(x, y, C.j);
  for (let y = 30; y <= 40; y++) for (let x = 21; x <= 27; x++) set(x, y, y <= 32 ? C.sk2 : C.sk);
  for (let y = 11; y <= 33; y++) for (let x = 14; x <= 34; x++) {
    const rx = y > 26 ? 9 - (y - 26) * 0.5 : 9;
    if (((x - 24) / rx) ** 2 + ((y - 22) / 11) ** 2 <= 1) set(x, y, x <= 16 ? C.sk2 : C.sk);
  }
  [[28,23],[29,23],[30,24],[19,23],[18,24]].forEach(([x, y]) => set(x, y, C.skh));
  for (let y = 39; y < N; y++) {
    const hw = Math.max(0, 5 - (y - 39) * 0.6);
    for (let x = Math.ceil(24 - hw); x <= Math.floor(24 + hw); x++) set(x, y, y <= 42 && Math.abs(x - 24) <= 3 - (y - 39) ? C.sk : C.t);
  }
  for (let y = 39; y < N; y++) {
    const o = Math.round((y - 39) * 0.55);
    set(18 + o, y, C.j3); set(17 + o, y, C.j2); set(30 - o, y, C.j3); set(31 - o, y, C.j2);
  }
  [[12,43],[13,44],[35,43],[34,44],[9,46],[39,46]].forEach(([x, y]) => set(x, y, C.j2));
  for (let y = 9; y <= 19; y++) for (let x = 14; x <= 34; x++) if (y <= 11 + Math.floor(Math.abs(x - 24) * 0.8)) set(x, y, C.h);
  set(24, 9, C.hh); set(24, 10, C.hh);
  for (let y = 17; y <= 45; y++) {
    const w = y % 5 < 2 ? 1 : 0;
    for (let x = 14 - w; x <= 16; x++) set(x, y, C.h);
    for (let x = 32; x <= 34 + w; x++) set(x, y, C.h);
  }
  [[15,20],[15,27],[33,21],[33,31],[16,36]].forEach(([x, y]) => set(x, y, C.hh));
  set(33, 28, C.g); set(33, 29, C.g);
  set(24, 24, C.sk2); set(25, 25, C.sk2); set(23, 25, C.sk2);

  // Merge horizontal runs into one path per color.
  const byColor = {};
  for (let y = 0; y < N; y++) {
    let x = 0;
    while (x < N) {
      const c = G[y][x];
      let w = 1;
      while (x + w < N && G[y][x + w] === c) w++;
      if (c) byColor[c] = (byColor[c] || "") + `M${x} ${y}h${w}v1h-${w}z`;
      x += w;
    }
  }
  return Object.entries(byColor);
})();

const R = ({ x, y, w, c, h = 1 }) => <rect x={x} y={y} width={w} height={h} fill={c} />;
const Eye = ({ x0, wide, half }) => {
  const top = wide ? 18 : half ? 20 : 19;
  return (
    <>
      <R x={x0 - 1} y={top} w={5} c={C.h} />
      {Array.from({ length: 21 - top }, (_, i) => <R key={i} x={x0} y={top + 1 + i} w={4} c={C.w} />)}
    </>
  );
};
const Iris = ({ x0 }) => (<><R x={x0 + 1} y={20} w={2} h={2} c={C.ir} /><R x={x0 + 2} y={20} w={1} c={C.w} /></>);

export default function Pip({ mood = "idle", size = 64, className = "", title, bg = "#efe8dc" }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} shapeRendering="crispEdges"
      className={`pxa pxa--${mood} rounded-[22%] ${className}`}
      role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      {bg && <rect width="48" height="48" fill={bg} />}
      {BASE.map(([c, d]) => <path key={c} d={d} fill={c} />)}
      <g className="pxa-g pxa-bn"><R x={18} y={17} w={4} c={C.h} /><g className="pxa-bR"><R x={27} y={17} w={4} c={C.h} /></g></g>
      <g className="pxa-g pxa-bu"><R x={18} y={16} w={4} c={C.h} /><R x={27} y={16} w={4} c={C.h} /></g>
      <g className="pxa-g pxa-eo"><Eye x0={18} /><Eye x0={27} /><g className="pxa-iris"><Iris x0={18} /><Iris x0={27} /></g></g>
      <g className="pxa-g pxa-es"><R x={17} y={21} w={5} c={C.h} /><R x={27} y={21} w={5} c={C.h} /></g>
      <g className="pxa-g pxa-ew"><Eye x0={18} wide /><Eye x0={27} wide /><Iris x0={18} /><Iris x0={27} /></g>
      <g className="pxa-g pxa-eh"><Eye x0={18} half /><Eye x0={27} half /><R x={19} y={21} w={2} c={C.ir} /><R x={28} y={21} w={2} c={C.ir} /></g>
      <g className="pxa-g pxa-mi"><R x={22} y={28} w={5} c={C.lip} /><R x={23} y={29} w={3} c={C.lip2} /></g>
      <g className="pxa-g pxa-mc"><R x={21} y={27} w={1} c={C.lip} /><R x={27} y={27} w={1} c={C.lip} /></g>
      <g className="pxa-g pxa-mo"><R x={22} y={28} w={5} c={C.dk} /><R x={23} y={29} w={3} c={C.dk} /></g>
      <g className="pxa-g pxa-bl"><R x={17} y={24} w={3} c={C.bl} /><R x={29} y={24} w={3} c={C.bl} /></g>
      <g className="pxa-g pxa-zz">
        <g className="pxa-z1"><R x={37} y={11} w={3} c={C.j3} /><R x={39} y={12} w={1} c={C.j3} /><R x={38} y={13} w={1} c={C.j3} /><R x={37} y={14} w={3} c={C.j3} /></g>
        <g className="pxa-z2"><R x={41} y={3} w={4} c={C.j3} /><R x={44} y={4} w={1} c={C.j3} /><R x={43} y={5} w={1} c={C.j3} /><R x={42} y={6} w={1} c={C.j3} /><R x={41} y={7} w={4} c={C.j3} /></g>
      </g>
      <g className="pxa-g pxa-ms"><R x={23} y={28} w={3} c={C.lip} /></g>
      <g className="pxa-g pxa-td"><R x={39} y={8} w={2} h={2} c={C.g} /><R x={42} y={6} w={2} h={2} c={C.g} /><R x={45} y={4} w={2} h={2} c={C.g} /></g>
    </svg>
  );
}
