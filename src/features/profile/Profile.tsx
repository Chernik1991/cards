import * as React from 'react'
import { useEffect } from 'react'

import Box from '@mui/material/Box'
import { Navigate, NavLink } from 'react-router-dom'

import userPic1 from '../../assets/img/profile/Alex.jpg'
// import userCamera from '../../assets/img/profile/camera-solid.svg'
import SuperButton from '../../common/components/c2-SuperButton/SuperButton'
import SuperEditableSpan from '../../common/components/c4-SuperEditableSpan/SuperEditableSpan'

import s from './profile.module.css'

// import { editedModeAC, setNewNameAC, setNewCurrnetNameAC } from './reducerProfile'
import { useAppDispatch, useAppSelector } from 'app/store'
import { PATH } from 'common/components/Routing/pages'
import { ResponseLoginType } from 'features/auth/auth-api'
import { initializeAppTC, logoutTC } from 'features/auth/login/auth-reducer'
import { CreateCardsTC, DeleteCardsTC, GetCardsTC, UpdateCardsTC } from 'features/cards/card/card-reducer'

export const Profile = () => {
  const dispatch = useAppDispatch()
  const userProfileData = useAppSelector<ResponseLoginType>(state => state.profile)

  // const userPhoto = userProfileData.avatar ? userProfileData.avatar : ''
  if (!userProfileData._id) {
    useEffect(() => {
      initializeAppTC()
    }, [])
  }
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} replace />
  }

  const logOutHandler = () => {
    dispatch(logoutTC())

    return <Navigate to={PATH.LOGIN} />
  }

  const customStyle = userProfileData.editedMode ? s.activeEditmode : ''
  const getcardHendler = () => {
    dispatch(GetCardsTC({ cardsPack_id: '640c5917893e3319116c7fc5' }))
  }
  const postcardHendler = () => {
    dispatch(
      CreateCardsTC({
        card: {
          answer: '',
          question: '',
          cardsPack_id: '640c5917893e3319116c7fc5',
        },
      })
    )
  }
  const delcardHendler = () => {
    dispatch(DeleteCardsTC({ id: '640cd015893e3319116cae74' }))
  }
  const updatecardHendler = () => {
    dispatch(UpdateCardsTC({ card: { _id: '640cda35893e3319116cafdd', question: '111111111' } }))
  }

  return (
    <>
      <button onClick={getcardHendler}>get card</button>
      <button onClick={postcardHendler}>new card</button>
      <button onClick={delcardHendler}>del card</button>
      <button onClick={updatecardHendler}>update card</button>
      <div className={s.profileContainer}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 4fr)',
            gridTemplateRows: 'auto',
            gridTemplateAreas: `"left profile rigth"`,
            height: '100%',
            width: '100%',
            maxWidth: '1440px',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              gridArea: 'left',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              paddingTop: 4,
            }}
          >
            <NavLink className={s.backContainer} to="#">
              <svg className={s.backArrow} viewBox="0 0 512 512">
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z" />
              </svg>
              <span> Back to Packs List</span>
            </NavLink>
          </Box>
          <Box
            sx={{
              gridArea: 'profile',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              paddingTop: 8,
            }}
          >
            <Box
              sx={{
                width: '100%',
                boxShadow: '4px 4px 4px #f4f4f5',
                minWidth: '180px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: 3,
                paddingBottom: 3,
                border: '2.5px solid #ebebec',
                bgcolor: '#ffffff',
              }}
            >
              <span className={s.defaultInfo}>Personal Information</span>
              <div className={s.userPhotoContainer}>
                <img
                  className={s.userPhoto}
                  src={userPic1}
                  alt="" // className={s.userPhoto} style={{ backgroundImage: `url(${userPhoto})` }}
                />
                <div className={s.userCameraContainer}>
                  <NavLink to="#">
                    <svg className={s.userCameraIcon} viewBox="0 0 512 512">
                      <path d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" />
                    </svg>
                  </NavLink>
                </div>
              </div>
              <div className={s.inputContainer}>
                <span className={`${s.inputLabelStyle + ' ' + customStyle}`}>Nickname</span>
                <SuperButton className={s.saveButton + ' ' + customStyle} id="userEditNickName">
                  SAVE
                </SuperButton>
                <SuperEditableSpan
                  // className={s.spanContainer}
                  value={userProfileData.currentName}
                  defaultInputClassName={s.pfofileInput}
                  spanProps={{
                    className: s.userNickName,
                    defaultText: userProfileData.name,
                  }}
                  id="userEditNickName"
                />
              </div>
              <span className={s.userEmail}>{userProfileData.email}</span>
              <NavLink className={s.logOut} to="" onClick={logOutHandler}>
                <svg className={s.logOutIcon} viewBox="0 0 512 512">
                  <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
                </svg>
                <span>Log out</span>
              </NavLink>
            </Box>
          </Box>
        </Box>
      </div>
      ;
    </>
  )
}
