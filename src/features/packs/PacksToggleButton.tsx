import * as React from 'react'

import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

import { setAppStatusAC } from '../../app/app-reducer'
import { useAppDispatch, useAppSelector } from '../../app/store'

import { getPacksTC } from './packsReducer'

export const PacksToggleButton = () => {
  const dispatch = useAppDispatch()

  const getIdUser = useAppSelector<string>(state => state.profile._id)

  const [alignment, setAlignment] = React.useState('all')

  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment)
    }
  }

  const handleChangeMy = () => {
    dispatch(setAppStatusAC('loading'))
    dispatch(getPacksTC({ params: { user_id: getIdUser } }))
  }
  const handleChangeAll = () => {
    dispatch(setAppStatusAC('loading'))
    dispatch(getPacksTC({ params: { user_id: null } }))
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
