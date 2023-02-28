import React from 'react'

import { Routes, Route, Navigate } from 'react-router-dom'

import { Login } from '../../../features/auth/a1-login/login'
import { Register } from '../../../features/auth/a2-register/register'
import { Profile } from '../../../features/profile/profile'
import { Test } from '../../../features/test/test'

import Error404 from './pages/Error404'

export const PATH = {
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  RESET_YOUR_PASSWORD: '/reset-your-password',
  ENTER_YOUR_NEW_PASSWORD: '/enter-your-new-password',
  TEST: '/test',
}

export const Pages = () => {
  return (
    <div>
      <Routes>
        <Route path={'/'} element={<Navigate to={PATH.LOGIN} />} />
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.REGISTER} element={<Register />} />
        <Route path={PATH.PROFILE} element={<Profile />} />
        <Route path={PATH.RESET_YOUR_PASSWORD} element={<Register />} />
        <Route path={PATH.ENTER_YOUR_NEW_PASSWORD} element={<Register />} />
        <Route path={PATH.TEST} element={<Test />} />
        <Route path={'/*'} element={<Error404 />} />
      </Routes>
    </div>
  )
}
