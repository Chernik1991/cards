import { useCallback } from 'react'

import { setAppErrorAC } from 'app/app-reducer'
import { getPacksTC } from 'features/packs/packsReducer'
import { setUserParamsAC } from 'features/packs/paramsReducer'
import { paramsProfile } from 'features/profile/selectorProfile'
import { useAppDispatch, useAppSelector } from 'store/store'

export const useSearchPanelLogic = () => {
  const dispatch = useAppDispatch()
  const params = useAppSelector(paramsProfile)

  const onChangeSearchHandler = useCallback((searchValue: string) => {
    if (searchValue) {
      dispatch(setUserParamsAC({ ...params, packName: searchValue }))
      dispatch(getPacksTC({ ...params, packName: searchValue }))
    } else {
      dispatch(setAppErrorAC("input can't be empty"))
    }
  }, [])

  const onChangeValuesHandler = useCallback((values: number[]) => {
    dispatch(setUserParamsAC({ ...params, min: values[0], max: values[1] }))
    dispatch(getPacksTC({ ...params, min: values[0], max: values[1] }))
  }, [])

  return { onChangeSearchHandler, onChangeValuesHandler }
}
