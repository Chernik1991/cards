import React, { useCallback } from 'react'

import { Box } from '@mui/material'

import { appStatus } from 'app/selectorApp'
import { GetCardsTC } from 'features/cards/card/card-reducer'
import { SearchInput } from 'features/packs/InputSearch'
import { useAppDispatch, useAppSelector } from 'store/store'

type PropsType = {
  cardsPack_id: string | undefined
}

export const SearchCardPanel = (props: PropsType) => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(appStatus)
  const onChangeSearchHandler = useCallback((searchValue: string) => {
    if (props.cardsPack_id) {
      dispatch(GetCardsTC({ cardsPack_id: props.cardsPack_id, cardQuestion: searchValue }))
    }
  }, [])

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
        <SearchInput disabled={status === 'loading'} onChangeText={onChangeSearchHandler} searchValue={''} />
      </Box>
    </Box>
  )
}
