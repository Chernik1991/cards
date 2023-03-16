import React from 'react'

import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import { Box, IconButton } from '@mui/material'

import { RangeSlider } from './PacksSlider'
import { PacksToggleButton } from './PacksToggleButton'

export const SearchPackPanel = () => {
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
      </Box>
      <Box>
        <Box>
          <label style={{ fontSize: '20px', paddingLeft: '10px', fontWeight: '600' }}>Show packs cards</label>
        </Box>
        <PacksToggleButton />
      </Box>
      <Box>
        <label style={{ fontSize: '20px', paddingLeft: '10px', fontWeight: '600' }}>Number of cards</label>
        <RangeSlider />
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
