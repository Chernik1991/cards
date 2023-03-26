import React, { useState } from 'react'

import { Button } from '@mui/material'
import { NavLink } from 'react-router-dom'

import { menuHeaderDataInfo } from './headerData'

import itINC from 'assets/img/icons/itINC.svg'
import defaultPic from 'assets/img/profile/Alex.jpg'
import { SuperCard } from 'common/components/c12-SuperCard/SuperCard'
import { ErrorSnackbar } from 'common/utils/ErrorSnackbar'
import { logoutTC } from 'features/auth/login/auth-reducer'
import * as authSelectors from 'features/auth/selectorAuth'
import o from 'features/cards/cardMenu/CardMenu.module.css'
import * as profileSelectors from 'features/profile/selectorProfile'
import s from 'header/HeaderStyles.module.css'
import { PATH } from 'routes/pages'
import { useAppDispatch, useAppSelector } from 'store/store'

export const Header = () => {
  const isLoggedIn = useAppSelector(authSelectors.isLoggedIn)
  const name = useAppSelector(profileSelectors.name)
  const [activeMenu, setActiveMenu] = useState(false)
  const dispatch = useAppDispatch()
  // const userPhoto = profileData.avatar ? profileData.avatar : defaultPic
  const handleOpenMenu = () => {
    setActiveMenu(!activeMenu)
  }
  const handleOpen = (value: string) => {
    if (value === 'Log Out') {
      dispatch(logoutTC())
    }
  }

  const active = (
    <div className={o.profileInfoStyle + ' ' + s.headerContainer}>
      <SuperCard
        cardStyle={o.menuContainer}
        menuData={menuHeaderDataInfo}
        menuCardHandler={handleOpen}
        maxHeight={'85px'}
      />
      <div className={o.arrowUp + ' ' + s.headerArrow} />
    </div>
  )

  const userJSX = (
    <div className={s.userDataContainer} onClick={handleOpenMenu}>
      {activeMenu ? <div>{active}</div> : ''}
      <span className={s.userName}>{name}</span>
      <img className={s.userPhoto} src={defaultPic} alt="userPhoto" />
    </div>
  )
  const routes = (
    <>
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
    </>
  )

  return (
    <div>
      {routes}
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
