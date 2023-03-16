import React from 'react'

import { Box, Slider } from '@mui/material'

function valuetext(value: number) {
  return `${value}°C`
}

export function RangeSlider() {
  const [value, setValue] = React.useState<number[]>([20, 37])

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

  return (
    <Box style={{ width: '400px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box
        sx={{
          width: '45px',
          textAlign: 'center',
          border: '1px solid grey',
          padding: '5px',
          borderRadius: '5px',
        }}
      >
        {value[0]}
      </Box>
      <Box sx={{ width: '250px', margin: '5px' }}>
        <Slider
          getAriaLabel={() => 'Temperature range'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
        />
      </Box>
      <Box
        sx={{
          border: '1px solid grey',
          padding: '5px',
          borderRadius: '5px',
          width: '45px',
          textAlign: 'center',
        }}
      >
        {value[1]}
      </Box>
    </Box>
  )
}
