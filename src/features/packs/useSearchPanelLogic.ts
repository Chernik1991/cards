import { useCallback } from 'react'

import { useAppDispatch } from '../../app/store'

import { getPacksTC } from './packsReducer'

export const useSearchPanelLogic = () => {
  const dispatch = useAppDispatch()

  const onChangeSearchHandler = useCallback((searchValue: string) => {
    dispatch(getPacksTC({ packName: searchValue }))
  }, [])

  const onChangeValuesHandler = useCallback((values: number[]) => {
    dispatch(getPacksTC({ min: values[0], max: values[1] }))
  }, [])

  return { onChangeSearchHandler, onChangeValuesHandler }
}
