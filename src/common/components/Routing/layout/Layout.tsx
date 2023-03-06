import React from 'react'

import { NavLink, Outlet } from 'react-router-dom'

import { PATH } from 'common/components/Routing/pages'
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
      <header>
        <div>header Layout</div>
        <NavLink to={PATH.LOGIN}>Login</NavLink>
        <NavLink to={PATH.REGISTER}>Register</NavLink>
        <NavLink to={PATH.PROFILE}>Profile</NavLink>
        <NavLink to={PATH.RESET_YOUR_PASSWORD}>Register</NavLink>
        <NavLink to={PATH.ENTER_YOUR_NEW_PASSWORD}>Register</NavLink>
        <NavLink to={PATH.TEST}>Test</NavLink>
        <NavLink to={'*'}>Error404</NavLink>
      </header>
      <Outlet />
      <footer>footer Layout</footer>
      {/*<Sidebar open={open} handleClose={handleClose} />*/}
      {/*<Header handleOpen={handleOpen} />*/}
      {/*<div>*/}
      {/*страницы*/}
      {/*{children}*/}
      {/*</div>*/}
    </>
  )
}
