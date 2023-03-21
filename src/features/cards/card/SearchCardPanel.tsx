import React, { useCallback } from 'react'

import { Box } from '@mui/material'

import { appStatus } from 'app/selectorApp'
import { GetCardsTC } from 'features/cards/card/card-reducer'
import { useAppDispatch, useAppSelector } from 'store/store'

type PropsType = {
  cardsPack_id: string
  searchParams: any
  searchCardPanelParams: (data: any) => void
}

export const SearchCardPanel = (props: PropsType) => {
  // const [searchParams, setSearchParams] = useSearchParams()
  // const params = Object.fromEntries(props.searchParams)
  const dispatch = useAppDispatch()
  const status = useAppSelector(appStatus)
  const onChangeSearchHandler = useCallback((searchValue: string) => {
    if (searchValue !== '') {
      dispatch(GetCardsTC({ cardsPack_id: props.cardsPack_id, cardQuestion: searchValue }))
      props.searchCardPanelParams({
        cardsPack_id: props.cardsPack_id.toString(),
        cardQuestion: searchValue.toString(),
      })
    }
    console.log('SearchCardPanel')
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
        {/*<SearchInput disabled={status === 'loading'} onChangeText={onChangeSearchHandler} searchValue={''} />*/}
      </Box>
    </Box>
  )
}
