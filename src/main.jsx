import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <App initialPath={window.location.pathname} />
  </StrictMode>
)

// Production builds ship prerendered HTML (see scripts/prerender.mjs), so React
// attaches to the markup that is already on the page instead of rebuilding it.
// In `vite dev` the root is empty and React renders from scratch as before.
if (container.firstElementChild) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
