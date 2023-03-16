import React from 'react'

import { Box } from '@mui/material'
import { SearchInput } from '../../packs/InputSearch'
import { useSearchPanelLogic } from '../../packs/useSearchPanelLogic'

import { CustomizedInputBase } from 'common/utils/CustomizedInputBase'

export const SearchPackPanel = () => {
  const { onChangeSearchHandler } = useSearchPanelLogic()
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
        <SearchInput onChangeText={onChangeSearchHandler} searchValue={''} />
      </Box>
    </Box>
  )
}
