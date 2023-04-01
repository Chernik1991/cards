import React, { useState } from 'react'

import { Button } from '@mui/material'
import { NavLink } from 'react-router-dom'

import { menuHeaderDataInfo } from './headerData'

import itINC from 'assets/img/icons/itINC.svg'
import { SuperCard } from 'common/components/c12-SuperCard/SuperCard'
import { sxHeader } from 'common/constans/constans'
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
  const avatar = useAppSelector(profileSelectors.avatar)
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
      {activeMenu ? (
        <div>
          <div className={s.closingContainer} />
          {active}
        </div>
      ) : (
        ''
      )}
      <span className={s.userName}>{name}</span>
      <img className={s.userPhoto} src={avatar} alt="userPhoto" />
    </div>
  )

  return (
    <div>
      <div className={s.headerBlock}>
        <img alt={'IMG'} src={itINC} />
        {isLoggedIn ? (
          userJSX
        ) : (
          <NavLink to={PATH.LOGIN} replace>
            <Button variant="contained" sx={sxHeader}>
              Sign In
            </Button>
          </NavLink>
        )}
      </div>
      <ErrorSnackbar />
    </div>
  )
}
