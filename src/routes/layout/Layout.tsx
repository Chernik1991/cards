import React from 'react'

import { LinearProgress } from '@mui/material'
import { Outlet } from 'react-router-dom'

import { RequestStatusType } from 'app/app-reducer'
import { Footer } from 'footer/footer'
import { Header } from 'header/Header'
import { useAppSelector } from 'store/store'

export const Layout = () => {
  const status = useAppSelector<RequestStatusType>(state => state.app.status)

  return (
    <>
      <Header />
      {status === 'loading' && <LinearProgress color={'primary'} />}
      <Outlet />
      <Footer />
    </>
  )
}
