import React from 'react'

import { Button } from '@mui/material'
import { NavLink } from 'react-router-dom'

import itINC from '../../assets/img/icons/itINC.svg'

import s from './HeaderStyles.module.css'

import { RequestStatusType } from 'app/app-reducer'
import { useAppDispatch, useAppSelector } from 'app/store'
import { PATH } from 'common/components/Routing/pages'
import { logoutTC } from 'features/auth/login/auth-reducer'

export const Header = () => {
  const status = useAppSelector<RequestStatusType>(state => state.app.status)
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const dispatch = useAppDispatch()

  const logOutHandler = () => {
    dispatch(logoutTC())
  }

  return (
    <div>
      <NavLink to={PATH.LOGIN}>Login</NavLink>
      <NavLink to={PATH.REGISTER}>Register</NavLink>
      <NavLink to={PATH.PROFILE}>Profile</NavLink>
      {/*<NavLink to={PATH.RESET_YOUR_PASSWORD}>Register</NavLink>*/}
      {/*<NavLink to={PATH.ENTER_YOUR_NEW_PASSWORD}>Register</NavLink>*/}
      <NavLink to={PATH.TEST}>Test</NavLink>
      <NavLink to={'*'}>Error404</NavLink>
      <div className={s.headerBlock}>
        <img alt={'IMG'} src={itINC} />

        {!isLoggedIn && (
          <Button
            variant="contained"
            sx={{
              borderRadius: '20px',
              minWidth: '115px',
              fontSize: '16px',
              lineHeight: '20px',
              fontFamily: 'Montserrat, sans-serif',
              fontStyle: 'Medium',
              textTransform: 'none',
            }}
          >
            <a className={s.headerA} href={'#/login'}>
              Sign In
            </a>
          </Button>
        )}

        {isLoggedIn && (
          <Button
            onClick={logOutHandler}
            variant="contained"
            sx={{
              borderRadius: '20px',
              minWidth: '115px',
              fontSize: '16px',
              lineHeight: '20px',
              fontFamily: 'Montserrat, sans-serif',
              fontStyle: 'Medium',
              textTransform: 'none',
            }}
          >
            <a className={s.headerA} href={'#/login'}>
              Log out
            </a>
          </Button>
        )}
      </div>
    </div>
  )
}
