import React from 'react'

import './App.css'
import { LinearProgress } from '@mui/material'
import { useSelector } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import { Header } from '../features/header/Header'

import { RequestStatusType } from './app-reducer'
import { AppRootStateType } from './store'

import { Pages } from 'common/components/Routing/pages'

function App() {
  const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

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
    </div>
  )
}

export default App
