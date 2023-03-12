import { useEffect } from 'react'

import Box from '@mui/material/Box'
import { Navigate, NavLink } from 'react-router-dom'

import { PackType, ResponsePacksType } from './packs-api'
import s from './Packs.module.css'
import { addPackTC, getPacksTC } from './packsReducer'

import { useAppDispatch, useAppSelector } from 'app/store'
import SuperButton from 'common/components/c2-SuperButton/SuperButton'
import { PATH } from 'common/components/Routing/pages'

export const Packs = () => {
  const dispatch = useAppDispatch()
  const userPacks = useAppSelector<ResponsePacksType>(state => state.packs)
  // const userPhoto = userProfileData.avatar ? userProfileData.avatar : ''

  console.log(userPacks)

  // useEffect(() => {
  //   dispatch(getPacksTC())
  // }, [])
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

  const newPackHandler = () => {
    dispatch(addPackTC())
  }

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} replace />
  }

  const mappedPacks = userPacks.cardPacks.map((el: PackType) => {
    return (
      <div
        key={crypto.randomUUID()}
        style={{ width: '1400px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}
      >
        <span style={{ width: '100px' }}>{el.name}</span>
        <span>{el.updated}</span>
        <span>{el.cardsCount}</span>
      </div>
    )
  })

  return (
    <div className={s.packsContainer}>
      <div style={{ width: '1400px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <h2>Packs List</h2>
        <SuperButton onClick={newPackHandler}>Add new pack</SuperButton>
      </div>
      {mappedPacks}
    </div>
  )
}
