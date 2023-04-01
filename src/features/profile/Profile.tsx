import * as React from 'react'
import { useEffect } from 'react'

import Box from '@mui/material/Box'
import { Navigate, NavLink } from 'react-router-dom'

import SuperButton from 'common/components/c2-SuperButton/SuperButton'
import SuperEditableSpan from 'common/components/c4-SuperEditableSpan/SuperEditableSpan'
import { InputTypeFileIcon } from 'common/components/inputTypeFile/InputTypeFileIcon'
import { BackToPacksButton } from 'common/constans/BackToPacksButton'
import {
  defaultAva,
  sxProfileBeakTo,
  sxProfileBox,
  sxProfileBoxAll,
  sxProfilePersonalInfo,
} from 'common/constans/constans'
import { LogOutButton } from 'common/constans/LogOutButton'
import { initializeAppTC, logoutTC } from 'features/auth/login/auth-reducer'
import * as authSelectors from 'features/auth/selectorAuth'
import y from 'features/profile/Profile.module.css'
import { setNewAvatarAC, updateUserDataTC } from 'features/profile/reducerProfile'
import * as profileSelectors from 'features/profile/selectorProfile'
import { PATH } from 'routes/pages'
import { useAppDispatch, useAppSelector } from 'store/store'

export const Profile = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(authSelectors.isLoggedIn)
  const currentName = useAppSelector(profileSelectors.currentName)
  const userId = useAppSelector(profileSelectors._id)
  const editedMode = useAppSelector(profileSelectors.editedMode)
  const name = useAppSelector(profileSelectors.name)
  const email = useAppSelector(profileSelectors.email)
  const avatar = useAppSelector(profileSelectors.avatar)
  const setImage = (image: string) => {
    dispatch(setNewAvatarAC(image))
  }

  if (!userId) {
    useEffect(() => {
      dispatch(initializeAppTC())
    })
  }
  useEffect(() => {
    dispatch(updateUserDataTC())
  }, [avatar, name])

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} replace />
  }
  const logOutHandler = () => {
    dispatch(logoutTC())

    return <Navigate to={PATH.LOGIN} replace />
  }
  const customStyle = editedMode ? y.activeEditmode : ''

  return (
    <>
      <div className={y.profileContainer}>
        <Box sx={sxProfileBoxAll}>
          <Box sx={sxProfileBeakTo}>
            <NavLink className={y.backContainer} to={PATH.PACKS}>
              <BackToPacksButton />
            </NavLink>
          </Box>
          <Box sx={sxProfileBox}>
            <Box sx={sxProfilePersonalInfo}>
              <span className={y.defaultInfo}>Personal Information</span>
              <div className={y.userPhotoContainer}>
                <img src={avatar} className={y.userPhoto} alt="ava" />
                <div className={y.userCameraContainer}>
                  <InputTypeFileIcon icon={true} setImage={setImage} defaultImage={defaultAva} />
                </div>
              </div>
              <div className={y.inputContainer}>
                <span className={`${y.inputLabelStyle + ' ' + customStyle}`}>Nickname</span>
                <SuperButton className={y.saveButton + ' ' + customStyle} id="userEditNickName">
                  SAVE
                </SuperButton>
                <SuperEditableSpan
                  value={currentName}
                  defaultInputClassName={y.profileInput}
                  spanProps={{
                    className: y.userNickName,
                    defaultText: name,
                  }}
                  id="userEditNickName"
                />
              </div>
              <span className={y.userEmail}>{email}</span>
              <NavLink className={y.logOut} to={PATH.LOGIN} onClick={logOutHandler}>
                <LogOutButton />
              </NavLink>
            </Box>
          </Box>
        </Box>
      </div>
    </>
  )
}
