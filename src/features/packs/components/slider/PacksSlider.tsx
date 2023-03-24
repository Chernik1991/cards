import * as React from 'react'
import { ChangeEvent, memo, useCallback, useEffect, useState } from 'react'

import Slider from '@mui/material/Slider'
import TextField from '@mui/material/TextField'

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
export const PacksSlider = memo(
  ({ minValue, maxValue, onChangeValues, disabled, defaultMax, defaultMin }: InputSliderPropsType) => {
    useEffect(() => {
      setValue([minValue, maxValue])
    }, [minValue, maxValue])
    const [value, setValue] = useState<number[]>([defaultMin, defaultMax])

    const handleChange = (event: Event, newValue: number | number[]) => {
      setValue(newValue as number[])
    }
    const onChangeCommittedHandler = useCallback(() => {
      onChangeValues(value)
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

    useEffect(() => {
      onChangeValues([defaultMin, defaultMax])
    }, [defaultMin, defaultMax])

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
)
