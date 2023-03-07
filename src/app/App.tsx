import React, { useEffect } from 'react'

import './App.css'
import { CircularProgress } from '@mui/material'
import { HashRouter } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from 'app/store'
import { Pages } from 'common/components/Routing/pages'
import { initializeAppTC } from 'features/auth/a1-login/auth-reducer'

function App() {
  const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])
  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    )
  }

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
