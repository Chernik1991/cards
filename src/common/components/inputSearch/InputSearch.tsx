import { ChangeEvent, FC, memo, useEffect, useState } from 'react'

import InputBase, { InputBaseProps } from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'

import find from 'assets/img/icons/find.svg'
import s from 'common/components/inputSearch/InputSearch.module.css'
import { useDebounce } from 'common/hooks/useDebounce'

type SearchInputPropsType = InputBaseProps & {
  searchValue: string | undefined
  onChangeText?: (value: string) => void
  callBackSearchInput: () => void
}
export const SearchInput: FC<SearchInputPropsType> = memo(
  ({ onChangeText, searchValue, callBackSearchInput, ...restProps }) => {
    console.log('SearchInput')
    const [value, setValue] = useState<string>(searchValue || '')
    const debouncedValue = useDebounce<string>(value, 800)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.currentTarget.value)
    }
    const onClickHandler = () => {
      callBackSearchInput()
    }

    useEffect(() => {
      if (value === searchValue) {
        setValue(searchValue)
      }
    }, [searchValue])

    useEffect(() => {
      onChangeText?.(debouncedValue)
    }, [debouncedValue])

    return (
      <div>
        <Paper component="form" elevation={0} className={s.container} sx={{ background: 'transparent' }}>
          <img src={find} className={s.findIcon} alt="find" />
          {/*<div onClick={onClickHandler}>*/}
          <InputBase
            className={s.input}
            value={value}
            onChange={onChangeHandler}
            placeholder="Provide your text"
            onClick={onClickHandler}
            // inputProps={{ 'aria-label': 'provide your text' }}
            {...restProps}
          />
          {/*</div>*/}
        </Paper>
      </div>
    )
  }
)