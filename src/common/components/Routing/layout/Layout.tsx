import React from 'react'

import { Outlet } from 'react-router-dom'

import { Footer } from 'features/footer/footer'
import Header from 'features/header/header'
// import { Header } from '../header/Header'
// import { Sidebar } from '../sidebar/Sidebar'

// type PropsType = {
//   children: ReactNode
// }

export const Layout = () => {
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
      <Header />
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
