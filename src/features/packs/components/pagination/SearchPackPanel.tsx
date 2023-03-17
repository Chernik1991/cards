import React from 'react'

import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import { Box, IconButton } from '@mui/material'

import { PacksToggleButton } from './PacksToggleButton'

import { appStatus } from 'app/selectorApp'
import { SearchInput } from 'features/packs/InputSearch'
import { packMaxCardsCount, packMinCardsCount } from 'features/packs/selectorPack'
import { InputSlider } from 'features/packs/Slider/DoubleSlider'
import { useSearchPanelLogic } from 'features/packs/useSearchPanelLogic'
import { useAppSelector } from 'store/store'

export const SearchPackPanel = () => {
  const { onChangeSearchHandler, onChangeValuesHandler } = useSearchPanelLogic()
  const minCardsCount = useAppSelector(packMinCardsCount)
  const maxCardsCount = useAppSelector(packMaxCardsCount)
  const status = useAppSelector(appStatus)

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
        <SearchInput disabled={status == 'loading'} onChangeText={onChangeSearchHandler} searchValue={''} />
      </Box>
      <Box>
        <Box>
          <label style={{ fontSize: '20px', paddingLeft: '10px', fontWeight: '600' }}>Show packs cards</label>
        </Box>
        <PacksToggleButton />
      </Box>
      <Box>
        <label style={{ fontSize: '20px', paddingLeft: '10px', fontWeight: '600' }}>Number of cards</label>
        <InputSlider
          minValue={minCardsCount || 0}
          maxValue={maxCardsCount || 0}
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
        <IconButton aria-label="delete" size="large">
          <FilterAltOffIcon fontSize="inherit" />
        </IconButton>
      </Box>
    </Box>
  )
}
