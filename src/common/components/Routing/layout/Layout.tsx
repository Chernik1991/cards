import React from 'react'

import { LinearProgress } from '@mui/material'
import { Outlet } from 'react-router-dom'

import { RequestStatusType } from 'app/app-reducer'
import { useAppSelector } from 'app/store'
import { Footer } from 'features/footer/footer'
import { Header1 } from 'features/header/Header1'

// import { Header } from '../header/Header'
// import { Sidebar } from '../sidebar/Sidebar'

// type PropsType = {
//   children: ReactNode
// }

export const Layout = () => {
  const status = useAppSelector<RequestStatusType>(state => state.app.status)

  // const [open, setOpen] = useState(false)
  // // const handleClose = () => setOpen(false)
  // const handleOpen = () => setOpen(true)
  //
  // useEffect(() => {
  //     open && (document.body.style.overflow = 'hidden')
  //     !open && (document.body.style.overflow = 'unset')
  // }, [open]) // отключает прокрутку при открытом меню
  return (
    <>
      <Header1 />
      {status === 'loading' && <LinearProgress color={'primary'} />}
      <Outlet />
      <Footer />
      {/*<Sidebar open={open} handleClose={handleClose} />*/}
      {/*<Header handleOpen={handleOpen} />*/}
      {/*<div>*/}
      {/*страницы*/}
      {/*{children}*/}
      {/*</div>*/}
    </>
  )
}
