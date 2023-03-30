import React from 'react'

import { Route, Routes } from 'react-router-dom'

import { CheckEmail } from 'features/auth/forgotPassword/checkEmail/checkEmail'
import { CreateNewPassword } from 'features/auth/forgotPassword/createNewPassword/createNewPassword'
import { ForgotPassword } from 'features/auth/forgotPassword/forgotPassword/forgotPassword'
import { Login } from 'features/auth/login/Login'
import { Register } from 'features/auth/register/Register'
import { Cards } from 'features/cards/Cards'
import { Learn } from 'features/learn/Learn'
import { Packs } from 'features/packs/Packs'
import { Profile } from 'features/profile/Profile'
import { Layout } from 'routes/layout/Layout'
import { Error404 } from 'routes/pages/Error404'

export const PATH = {
  HASH: '#',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  FORGOT_YOUR_PASSWORD: '/forgot-your-password',
  CHECK_EMAIL: '/check-email',
  CREATE_NEW_PASSWORD: `/create-new-password/:token`,
  CARD: '/cards/searchCardPanel',
  PACKS: `/packs`,
  CARD_NOT_PACK: `/card-not-pack`,
  LEARN: `/learn`,
  TEST: '/test',
} as const
//TODO
//разобраться с #
export const Pages = () => {
  return (
    <div>
      <Routes>
        <Route path={'/'} element={<Layout />}>
          <Route index element={<Profile />} />
          <Route path={PATH.LOGIN} element={<Login />} />
          <Route path={PATH.REGISTER} element={<Register />} />
          <Route path={PATH.PROFILE} element={<Profile />} />
          <Route path={PATH.FORGOT_YOUR_PASSWORD} element={<ForgotPassword />} />
          <Route path={PATH.CHECK_EMAIL} element={<CheckEmail />} />
          <Route path={PATH.CREATE_NEW_PASSWORD} element={<CreateNewPassword />} />
          <Route path={PATH.CARD} element={<Cards />} />
          <Route path={PATH.PACKS} element={<Packs />} />
          <Route path={PATH.LEARN} element={<Learn />} />
          <Route path={'*'} element={<Error404 />} />
        </Route>
      </Routes>
    </div>
  )
}
