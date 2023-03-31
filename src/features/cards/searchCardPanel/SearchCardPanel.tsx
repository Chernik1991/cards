import React from 'react'

import { Box } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import * as appSelectors from 'app/selectorApp'
import { SearchInput } from 'common/components/inputSearch/InputSearch'
import { pageCardsAC, searchAC } from 'features/cards/cards-reducer'
import * as cardsSelectors from 'features/cards/selectorCard'
import { useAppDispatch, useAppSelector } from 'store/store'

export const SearchCardPanel = () => {
  const [searchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const dispatch = useAppDispatch()
  const status = useAppSelector(appSelectors.status)
  const search = useAppSelector(cardsSelectors.search)

  const searchHandler = (search: string) => {
    dispatch(searchAC(search))
    dispatch(pageCardsAC(1))
  }

  return (
    <Box width={'100%'} display={'flex'} justifyContent={'space-between'} gap={'50px'} alignItems={'end'}>
      <Box sx={{ width: '500px' }}>
        <label
          style={{
            fontSize: '20px',
            paddingLeft: '10px',
            fontWeight: '600',
          }}
        >
          Search
        </label>
        <SearchInput
          disabled={status === 'loading'}
          onChangeText={searchHandler}
          searchValue={params.search || search}
        />
      </Box>
    </Box>
  )
}
