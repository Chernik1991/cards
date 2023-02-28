import React from 'react'

import './App.css'
import { BrowserRouter, HashRouter } from 'react-router-dom'

import { Pages } from './routes/pages'

function App() {
  return (
    <div className="App">
      {/*<BrowserRouter>*/}
      <HashRouter>
        {/*<Layout>*/}
        <Pages />
        {/*</Layout>*/}
      </HashRouter>
      {/*</BrowserRouter>*/}
    </div>
  )
}

export default App
