import React from 'react'

import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import { IconButton } from '@mui/material'

import { filterAllOffPacksAC, isMyPacksAC } from 'features/packs/packsReducer'
import { packFilterOff, packMaxCardsCount, packMinCardsCount } from 'features/packs/selectorPack'
import { useAppDispatch, useAppSelector } from 'store/store'

export const FilterAllOff = () => {
  const filterOff = useAppSelector(packFilterOff)
  const minCardsCount = useAppSelector(packMinCardsCount)
  const maxCardsCount = useAppSelector(packMaxCardsCount)
  const dispatch = useAppDispatch()
  const onClickHandler = () => {
    dispatch(isMyPacksAC(false))
    dispatch(filterAllOffPacksAC(filterOff, minCardsCount, maxCardsCount))
  }

  return (
    <IconButton aria-label="delete" size="large" onClick={onClickHandler}>
      <FilterAltOffIcon fontSize="inherit" />
    </IconButton>
  )
}
