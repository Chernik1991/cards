import { useAppDispatch } from '../../app/store'
import { useCallback } from 'react'
import { getPacksTC } from './packsReducer'

export const useSearchPanelLogic = () => {
  const dispatch = useAppDispatch()

  const onChangeSearchHandler = useCallback((searchValue: string) => {
    dispatch(getPacksTC({ params: { packName: searchValue } }))
  }, [])

  const onChangeValuesHandler = useCallback((values: number[]) => {
    dispatch(getPacksTC({ params: { min: values[0], max: values[1] } }))
  }, [])
  return { onChangeSearchHandler, onChangeValuesHandler }
}
