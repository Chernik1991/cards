import React from 'react'

import { Button } from '@mui/material'
import { NavLink } from 'react-router-dom'

import itINC from 'assets/img/icons/itINC.svg'
import defaultPic from 'assets/img/profile/Alex.jpg'
import { ErrorSnackbar } from 'common/utils/ErrorSnackbar'
import * as authSelectors from 'features/auth/selectorAuth'
import * as profileSelectors from 'features/profile/selectorProfile'
import s from 'header/HeaderStyles.module.css'
import { PATH } from 'routes/pages'
import { useAppSelector } from 'store/store'

export const Header = () => {
  const isLoggedIn = useAppSelector(authSelectors.isLoggedIn)
  const name = useAppSelector(profileSelectors.name)
  // const userPhoto = profileData.avatar ? profileData.avatar : defaultPic

  const userJSX = (
    <div className={s.userDataContainer}>
      <span className={s.userName}>{name}</span>
      <img className={s.userPhoto} src={defaultPic} alt="userPhoto" />
    </div>
  )

  return (
    <div>
      <NavLink to={PATH.LOGIN}>[Login] </NavLink>
      <NavLink to={PATH.REGISTER}>[Register] </NavLink>
      <NavLink to={PATH.PROFILE}>[Profile] </NavLink>
      <NavLink to={PATH.FORGOT_YOUR_PASSWORD}>[ForgotPassword]</NavLink>
      <NavLink to={PATH.CHECK_EMAIL}> [CheckEmail] </NavLink>
      <NavLink to={PATH.CREATE_NEW_PASSWORD}>[CreateNewPassword]</NavLink>
      <NavLink to={PATH.CARD}>[Card]</NavLink>
      <NavLink to={PATH.PACKS}>[Pack]</NavLink>
      <NavLink to={PATH.CARD_NOT_PACK}>[CardNotPack]</NavLink>
      <NavLink to={PATH.TEST}>[Test]</NavLink>
      <NavLink to={'*'}>[Error404]</NavLink>
      <div className={s.headerBlock}>
        <img alt={'IMG'} src={itINC} />
        {isLoggedIn ? (
          userJSX
        ) : (
          <NavLink to={PATH.LOGIN} replace>
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
              Sign In
            </Button>
          </NavLink>
        )}
      </div>
      <ErrorSnackbar />
    </div>
  )
}
