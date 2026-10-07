import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'

// Used only at build time by scripts/prerender.mjs. Renders the app for one
// URL path and returns the HTML string that goes inside <div id="root">.
export function render(path) {
  return renderToString(
    <StrictMode>
      <App initialPath={path} />
    </StrictMode>,
  )
}
