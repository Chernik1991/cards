import * as React from 'react'

import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { useSearchParams } from 'react-router-dom'

import { setAppStatusAC } from 'app/app-reducer'
import { getPacksTC, setMyPacksAC } from 'features/packs/packsReducer'
import { setUserParamsAC } from 'features/packs/paramsReducer'
import { userIdProfile } from 'features/profile/selectorProfile'
import { useAppDispatch, useAppSelector } from 'store/store'

export const PacksToggleButton = () => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const getIdUser = useAppSelector(userIdProfile)

  const [alignment, setAlignment] = React.useState('all')

  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment)
    }
  }

  const handleChangeMy = () => {
    dispatch(setAppStatusAC('loading'))
    // dispatch(setUserParamsAC({ user_id: getIdUser }))
    dispatch(getPacksTC({ user_id: getIdUser }))
    setSearchParams({ user_id: getIdUser.toString() })
    dispatch(setMyPacksAC(true))
  }
  const handleChangeAll = () => {
    dispatch(setAppStatusAC('loading'))
    dispatch(setUserParamsAC({ user_id: null }))
    dispatch(getPacksTC({}))
    setSearchParams({})
    dispatch(setMyPacksAC(false))
  }

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
      <ToggleButton sx={{ width: '100px' }} value="my" onClick={handleChangeMy}>
        My
      </ToggleButton>
      <ToggleButton sx={{ width: '100px' }} value="all" onClick={handleChangeAll}>
        All
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
