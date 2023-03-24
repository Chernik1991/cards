import React from 'react'

import { Box } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import { SortPacksMyAll } from './SortPacksMyAll'

import { appStatus } from 'app/selectorApp'
import { SearchInput } from 'common/components/inputSearch/InputSearch'
import { PacksSlider } from 'features/packs/components/slider/PacksSlider'
import { FilterAllOff } from 'features/packs/FilterAllOff'
import { maxAC, minAC, pagePacksAC, searchPacksAC } from 'features/packs/packsReducer'
import { packMaxCardsCount, packMinCardsCount, packSearch } from 'features/packs/selectorPack'
import { useAppDispatch, useAppSelector } from 'store/store'

export const SearchPackPanel = () => {
  // console.log('SearchPackPanel')
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const defaultMin = useAppSelector(packMinCardsCount)
  const defaultMax = useAppSelector(packMaxCardsCount)
  const status = useAppSelector(appStatus)
  const search = useAppSelector(packSearch)

  const searchHandler = (search: string) => {
    dispatch(searchPacksAC(search))
    dispatch(pagePacksAC(1))
  }
  const onChangeValuesHandler = (values: number[]) => {
    dispatch(minAC(values[0]))
    dispatch(maxAC(values[1]))
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
          searchValue={params.packName || search}
        />
      </Box>
      <Box>
        <Box>
          <label style={{ fontSize: '20px', paddingLeft: '10px', fontWeight: '600' }}>Show packs cards</label>
        </Box>
        <SortPacksMyAll />
      </Box>
      <Box>
        <label style={{ fontSize: '20px', paddingLeft: '10px', fontWeight: '600' }}>Number of cards</label>
        <PacksSlider
          minValue={+params.min || defaultMin}
          maxValue={+params.max || defaultMax}
          defaultMax={defaultMax}
          defaultMin={defaultMin}
          sliderWidth={155}
          disabled={status == 'loading'}
          onChangeValues={onChangeValuesHandler}
        />
      </Box>
      <Box
        mb={'2'}
        sx={{
          textAlign: 'center',
          border: '1px solid grey',
          borderRadius: '5px',
        }}
      >
        <FilterAllOff />
      </Box>
    </Box>
  )
}
