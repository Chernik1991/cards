import React from 'react'

import { Routes, Route } from 'react-router-dom'

import Error404 from './pages/Error404'

import { Layout } from 'common/components/Routing/layout/Layout'
import { Login } from 'features/auth/a1-login/login'
import { Register } from 'features/auth/a2-register/register'
import { Profile } from 'features/profile/profile'
import { Test } from 'features/test/test'

export const PATH = {
  LOGIN: 'login',
  REGISTER: 'register',
  PROFILE: 'profile',
  RESET_YOUR_PASSWORD: 'reset-your-password',
  ENTER_YOUR_NEW_PASSWORD: 'enter-your-new-password',
  TEST: 'test',
}

export const Pages = () => {
  return (
    <div>
      <Routes>
        <Route path={'/'} element={<Layout />}>
          <Route index element={<Profile />} />
          <Route path={PATH.LOGIN} element={<Login />} />
          <Route path={PATH.REGISTER} element={<Register />} />
          <Route path={PATH.PROFILE} element={<Profile />} />
          <Route path={PATH.RESET_YOUR_PASSWORD} element={<Register />} />
          <Route path={PATH.ENTER_YOUR_NEW_PASSWORD} element={<Register />} />
          <Route path={PATH.TEST} element={<Test />} />
          <Route path={'*'} element={<Error404 />} />
        </Route>
      </Routes>
    </div>
  )
}
