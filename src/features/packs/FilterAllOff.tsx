import React from 'react'

import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import { IconButton } from '@mui/material'

import { filterAllOffPacksAC, isMyPacksAC } from 'features/packs/packsReducer'
import * as packsSelectors from 'features/packs/selectorPack'
import { useAppDispatch, useAppSelector } from 'store/store'

export const FilterAllOff = () => {
  const filterOff = useAppSelector(packsSelectors.filterOff)
  const minCardsCount = useAppSelector(packsSelectors.minCardsCount)
  const maxCardsCount = useAppSelector(packsSelectors.maxCardsCount)
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
