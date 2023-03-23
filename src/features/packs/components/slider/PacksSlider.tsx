import * as React from 'react'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'

import Slider from '@mui/material/Slider'
import TextField from '@mui/material/TextField'

import { useThrottle } from 'common/hooks/useTrottle'
import s from 'features/packs/components/slider/Slider.module.css'

type InputSliderPropsType = {
  minValue: number
  defaultMax: number
  defaultMin: number
  maxValue: number
  sliderWidth?: number
  onChangeValues: (value: number[]) => void
  disabled?: boolean
}
export const PacksSlider = ({
  minValue,
  maxValue,
  sliderWidth,
  onChangeValues,
  disabled,
  defaultMax,
  defaultMin,
}: InputSliderPropsType) => {
  useEffect(() => {
    setValue([minValue, maxValue])
    console.log(minValue, '11111111111111111')
  }, [minValue, maxValue, defaultMin, defaultMax])

  // useEffect(() => {
  //   setValue([defaultMin, defaultMax])
  //   console.log(defaultMin, defaultMax, '2222222222222222222222222')
  // }, [defaultMin, defaultMax])

  const [value, setValue] = useState<number[]>([defaultMin, defaultMax])

  console.log(value[0], '5555555555')

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }
  const onChangeCommittedHandler = useCallback(() => {
    onChangeValues(value)
    console.log(value, '33333333333333333333333333')
  }, [value])
  const inputProps = {
    inputMode: 'numeric',
    pattern: '[0-9]*',
  } as const
  const onChangeMaxHandler = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setValue([minValue, +e.currentTarget.value])
    },
    [minValue]
  )
  const onChangeMinHandler = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setValue([+e.currentTarget.value, maxValue])
    },
    [maxValue]
  )
  const throttledPage = useThrottle(value, 4000)

  useEffect(() => {
    onChangeValues(value)
    console.log(value, '77777777777777777777777')
  }, [throttledPage])

  return (
    <div>
      <div className={s.container}>
        <TextField
          sx={{ mr: '8px', paddingRight: 3 }}
          inputProps={inputProps}
          size="small"
          value={value[0]}
          onChange={onChangeMinHandler}
          className={`${s.input} ${s.value1}`}
          disabled={disabled}
        />
        <Slider
          // getAriaLabel={() => 'Temperature range'}
          value={value}
          max={defaultMax}
          min={defaultMin}
          onChange={handleChange}
          onChangeCommitted={onChangeCommittedHandler}
          valueLabelDisplay="auto"
          disabled={disabled}
        />
        <TextField
          sx={{ ml: '8px', paddingLeft: 1 }}
          inputProps={inputProps}
          size="small"
          value={value[1]}
          onChange={onChangeMaxHandler}
          className={`${s.input} ${s.value2}`}
          disabled={disabled}
        />
      </div>
    </div>
  )
}
