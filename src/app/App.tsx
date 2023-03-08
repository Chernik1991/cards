import React, { useEffect } from 'react'

import './App.css'
import { CircularProgress, LinearProgress } from '@mui/material'
import { useSelector } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from 'app/store'
import { Pages } from 'common/components/Routing/pages'
import { initializeAppTC } from 'features/auth/login/auth-reducer'
import { Header } from 'features/header/Header'

function App() {
  const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

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
      <Header />
      {status === 'loading' && <LinearProgress color={'primary'} />}

      <HashRouter>
        {/*<Layout>*/}
        <Pages />
        {/*</Layout>*/}
      </HashRouter>

      {/*</BrowserRouter>*/}
      <Pages />
    </div>
  )
}

export default App
