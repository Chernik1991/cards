import React from 'react'

import { Routes, Route } from 'react-router-dom'

import Error404 from './pages/Error404'

import { Layout } from 'common/components/Routing/layout/Layout'
import { CheckEmail } from 'features/auth/forgotPassword/checkEmail/checkEmail'
import { CreateNewPassword } from 'features/auth/forgotPassword/createNewPassword/createNewPassword'
import { ForgotPassword } from 'features/auth/forgotPassword/forgotPassword/forgotPassword'
import { Login } from 'features/auth/login/login'
import { Register } from 'features/auth/register/Register'
import { Profile } from 'features/profile/Profile'
import { Test } from 'features/test/test'

export const PATH = {
  LOGIN: 'login',
  REGISTER: 'register',
  PROFILE: 'profile',
  FORGOT_YOUR_PASSWORD: 'forgot-your-password',
  CHECK_EMAIL: 'check-email',
  CREATE_NEW_PASSWORD: 'create-new-password',
  TEST: 'test',
}

export const Pages = () => {
  return (
    <div>
      <Routes>
        <Route path={'/'} element={<Layout />}>
          {/*<Route index element={<Profile />} />*/}
          <Route path={PATH.PROFILE} element={<Profile />} />
          <Route path={PATH.LOGIN} element={<Login />} />
          <Route path={PATH.REGISTER} element={<Register />} />
          <Route path={PATH.PROFILE} element={<Profile />} />
          <Route path={PATH.FORGOT_YOUR_PASSWORD} element={<ForgotPassword />} />
          <Route path={PATH.CHECK_EMAIL} element={<CheckEmail />} />
          <Route path={PATH.CREATE_NEW_PASSWORD} element={<CreateNewPassword />} />
          <Route path={PATH.TEST} element={<Test />} />
          <Route path={'*'} element={<Error404 />} />
        </Route>
      </Routes>
    </div>
  )
}
