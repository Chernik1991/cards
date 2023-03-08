import React from 'react'

import { AppBar, Button, IconButton, LinearProgress, Menu, Toolbar } from '@mui/material'
import Typography from '@mui/material/Typography'
import { NavLink } from 'react-router-dom'

import { RequestStatusType } from 'app/app-reducer'
import { useAppDispatch, useAppSelector } from 'app/store'
import { PATH } from 'common/components/Routing/pages'
import { logoutTC } from 'features/auth/login/auth-reducer'

const Header = () => {
  const status = useAppSelector<RequestStatusType>(state => state.app.status)
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const dispatch = useAppDispatch()
  const logOutHandler = () => {
    dispatch(logoutTC())
  }

  return (
    <>
      {/*<ErrorSnackbar />*/}
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu open={false} />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Typography variant="h6">
            {isLoggedIn && (
              <Button color="inherit" onClick={logOutHandler}>
                Log out
              </Button>
            )}
          </Typography>
          {/*{isLoggedIn && (*/}
          {/*  <Button color="inherit" onClick={logOutHandler}>*/}
          {/*    Log out*/}
          {/*  </Button>*/}
          {/*)}*/}
        </Toolbar>
        {status === 'loading' && <LinearProgress />}
      </AppBar>
      <div>header Layout</div>
      <NavLink to={PATH.LOGIN}>Login</NavLink>
      <NavLink to={PATH.REGISTER}>Register</NavLink>
      <NavLink to={PATH.PROFILE}>Profile</NavLink>
      <NavLink to={PATH.FORGOT_YOUR_PASSWORD}>Forgot Password</NavLink>
      <NavLink to={PATH.CHECK_EMAIL}>Check Email</NavLink>
      <NavLink to={PATH.CREATE_NEW_PASSWORD}>Create New Password</NavLink>
      <NavLink to={PATH.TEST}>Test</NavLink>
      <NavLink to={'*'}>Error404</NavLink>
    </>
  )
}

export default Header
