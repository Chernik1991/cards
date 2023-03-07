import React, { memo } from 'react'

import { Navigate } from 'react-router-dom'

import { useAppSelector } from 'app/store'

export const Profile = memo(() => {
  const data = useAppSelector<any>(state => state.profile.data)
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to={'/Login'} />
  }

  return <div>ID={data._id}</div>
})
