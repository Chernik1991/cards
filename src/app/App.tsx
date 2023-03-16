import React, { useEffect } from 'react'

import './App.css'
import { CircularProgress } from '@mui/material'

import { initializeAppTC } from 'features/auth/login/auth-reducer'
import { Pages } from 'routes/pages'
import { useAppDispatch, useAppSelector } from 'store/store'

export const App = () => {
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
      <Pages />
    </div>
  )
}
