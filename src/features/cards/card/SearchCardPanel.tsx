import React from 'react'

import { Box } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import { appStatus } from 'app/selectorApp'
import { SearchInput } from 'common/components/inputSearch/InputSearch'
import { cardQuestionAC, pageCardsAC } from 'features/cards/card/card-reducer'
import { cardQuestion } from 'features/cards/selectorCard'
import { useAppDispatch, useAppSelector } from 'store/store'

export const SearchCardPanel = () => {
  console.log('SearchCardPanel')
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const status = useAppSelector(appStatus)
  const search = useAppSelector(cardQuestion)

  const searchHandler = (search: string) => {
    dispatch(cardQuestionAC(search))
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
          searchValue={params.cardQuestion || search}
        />
      </Box>
    </Box>
  )
}
