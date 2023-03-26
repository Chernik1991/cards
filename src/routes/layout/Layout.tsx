import React from 'react'

import { LinearProgress } from '@mui/material'
import { Outlet } from 'react-router-dom'

import * as appSelectors from 'app/selectorApp'
import { Footer } from 'footer/footer'
import { Header } from 'header/Header'
import { useAppSelector } from 'store/store'

export const Layout = () => {
  const status = useAppSelector(appSelectors.status)

  return (
    <>
      <Header />
      {status === 'loading' && <LinearProgress color={'primary'} />}
      <Outlet />
      <Footer />
    </>
  )
}
