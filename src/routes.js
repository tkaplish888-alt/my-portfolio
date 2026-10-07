/* ═══════════════════════════════════════════════
   ROUTES
   Each project deep dive has a real URL so it can be
   prerendered to static HTML: /projects/<id>.
   Shared by Portfolio.jsx (client routing) and
   scripts/prerender.mjs (which pages to generate).
   ═══════════════════════════════════════════════ */
export const SITE_URL = "https://tonishqakaplish.com";
export const PROJECT_PATH = "/projects/";

export const projectPath = id => `${PROJECT_PATH}${id}`;

export const getProjectIdFromPath = (pathname = "/") => {
  const match = pathname.match(/^\/projects\/([^/]+)\/?$/);
  return match ? match[1] : null;
};
