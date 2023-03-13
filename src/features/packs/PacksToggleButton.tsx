import * as React from 'react'

import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

export const PacksToggleButton = () => {
  const [alignment, setAlignment] = React.useState('my')

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment)
  }

  return (
    <ToggleButtonGroup color="primary" value={alignment} exclusive onChange={handleChange} aria-label="Platform">
      <ToggleButton sx={{ width: '100px' }} value="my">
        My
      </ToggleButton>
      <ToggleButton sx={{ width: '100px' }} value="all">
        All
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
