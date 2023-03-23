import * as React from 'react'
import { useEffect, useState } from 'react'

import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

import { filterAllOffPacksAC, isMyPacksAC } from 'features/packs/packsReducer'
import { packFilterOff, packIsMyPacks, packMaxCardsCount, packMinCardsCount } from 'features/packs/selectorPack'
import { useAppDispatch, useAppSelector } from 'store/store'

export const PacksToggleButton = () => {
  console.log('PacksToggleButton')
  const dispatch = useAppDispatch()
  const isMyPacks = useAppSelector(packIsMyPacks)
  const filterOff = useAppSelector(packFilterOff)
  const minCardsCount = useAppSelector(packMinCardsCount)
  const maxCardsCount = useAppSelector(packMaxCardsCount)
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
    dispatch(filterAllOffPacksAC(filterOff, minCardsCount, maxCardsCount))
  }
  const handleChangeAll = () => {
    dispatch(isMyPacksAC(false))
    dispatch(filterAllOffPacksAC(filterOff, minCardsCount, maxCardsCount))
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
