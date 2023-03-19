import { useCallback } from 'react'

import { setAppErrorAC } from 'app/app-reducer'
import { getPacksTC } from 'features/packs/packsReducer'
// import { setUserParamsAC } from 'features/packs/paramsReducer'
import { useAppDispatch, useAppSelector } from 'store/store'

export const useSearchPanelLogic = () => {
  const dispatch = useAppDispatch()
  // const params = useAppSelector(paramsProfile)

  const onChangeSearchHandler = useCallback((searchValue: string) => {
    // dispatch(setUserParamsAC({ packName: searchValue }))
    dispatch(getPacksTC({ packName: searchValue }))
  }, [])

  const onChangeValuesHandler = useCallback((values: number[]) => {
    // dispatch(setUserParamsAC({ min: values[0], max: values[1] }))
    dispatch(getPacksTC({ min: values[0], max: values[1] }))
  }, [])

  return { onChangeSearchHandler, onChangeValuesHandler }
}
