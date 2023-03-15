import React from 'react'

import { Box } from '@mui/material'

export const SearchPackPanel = () => {
  return (
    <Box width={'100%'} display={'flex'} justifyContent={'space-between'} gap={'100px'} alignItems={'end'}>
      <Box sx={{ width: '100%' }}>
        <label
          style={{
            fontSize: '20px',
            fontWeight: '700',
            paddingTop: '10px',
          }}
        >
          Search
        </label>
      </Box>
    </Box>
  )
}
