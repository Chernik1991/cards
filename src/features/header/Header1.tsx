import React from 'react'

import { Button } from '@mui/material'

import itINC from '../../assets/img/icons/itINC.svg'
import defaultPic from '../../assets/img/profile/Alex.jpg'

import s from './HeaderStyles.module.css'

import { ProfileStateType, ProfileType } from 'api/cards-api'
import { useAppSelector } from 'app/store'

export const Header1 = () => {
  const auth = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const profileData = useAppSelector<ProfileStateType>(state => state.profile)
  const userPhoto = profileData.avatar ? profileData.avatar : defaultPic

  const userJSX = (
    <div className={s.userDataContainer}>
      <span className={s.userName}>{profileData.name}</span>
      <img className={s.userPhoto} src={defaultPic} alt="userPhoto" />
    </div>
  )

  return (
    <div>
      <div className={s.headerBlock}>
        <img alt={'IMG'} src={itINC} />
        {auth ? (
          userJSX
        ) : (
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
            <a className={s.headerA} href={'/login'}>
              Sign In
            </a>
          </Button>
        )}
      </div>
    </div>
  )
}
