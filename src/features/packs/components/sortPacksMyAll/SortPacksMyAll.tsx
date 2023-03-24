import * as React from 'react'
import { useEffect, useState } from 'react'

import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

import { isMyPacksAC } from 'features/packs/packsReducer'
import { packIsMyPacks } from 'features/packs/selectorPack'
import { useAppDispatch, useAppSelector } from 'store/store'

export const SortPacksMyAll = () => {
  // console.log('SortPacksMyAll')
  const dispatch = useAppDispatch()
  const isMyPacks = useAppSelector(packIsMyPacks)
  const [alignment, setAlignment] = useState('all')
  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment)
    }
  }

  useEffect(() => {
    if (isMyPacks) {
      setAlignment('my')
    } else {
      setAlignment('all')
    }
  }, [isMyPacks])
  const handleChangeMy = () => {
    dispatch(isMyPacksAC(true))
  }
  const handleChangeAll = () => {
    dispatch(isMyPacksAC(false))
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
