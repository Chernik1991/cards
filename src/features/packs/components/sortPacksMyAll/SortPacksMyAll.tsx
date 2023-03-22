import * as React from 'react'
import { useState } from 'react'

import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

type PacksToggleButtonType = {
  handleChangeMyPack: (my: boolean) => void
}
export const SortPacksMyAll = (props: PacksToggleButtonType) => {
  console.log('PacksToggleButton')
  const [alignment, setAlignment] = useState('all')
  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment)
    }
  }
  const handleChangeMy = () => {
    props.handleChangeMyPack(true)
  }
  const handleChangeAll = () => {
    props.handleChangeMyPack(false)
  }

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
      <ToggleButton sx={{ width: '100px' }} value="my" onClick={handleChangeMy}>
        My
      </ToggleButton>
      <ToggleButton sx={{ width: '100px' }} value="all" onClick={handleChangeAll}>
        All
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
