import Portfolio from './Portfolio'

// initialPath is the URL path being rendered. The browser passes
// window.location.pathname; the prerender script passes each route it builds.
function App({ initialPath }) {
  return <Portfolio initialPath={initialPath} />
}

export default App
