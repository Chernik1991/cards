import { useCallback } from 'react'

import { getPacksTC } from 'features/packs/packsReducer'
import { useAppDispatch } from 'store/store'

export const useSearchPanelPackLogic = () => {
  const dispatch = useAppDispatch()

  const onChangeSearchHandler = useCallback((searchValue: string) => {
    dispatch(getPacksTC({ packName: searchValue }))
  }, [])

  const onChangeValuesHandler = useCallback((values: number[]) => {
    dispatch(getPacksTC({ min: values[0], max: values[1] }))
  }, [])

  return { onChangeSearchHandler, onChangeValuesHandler }
}
