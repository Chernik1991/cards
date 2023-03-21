import { useSearchParams } from 'react-router-dom'

import { useAppDispatch } from 'store/store'

export const useSearchPanelPackLogic = () => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()

  // const onChangeSearchHandler = useCallback((searchValue: string) => {
  //   dispatch(getPacksTC({ packName: searchValue }))
  //   setSearchParams({ ...searchParams, packName: searchValue.toString() })
  // }, [])
  //
  // const onChangeValuesHandler = useCallback((values: number[]) => {
  //   dispatch(getPacksTC({ min: values[0], max: values[1] }))
  //   setSearchParams({ ...searchParams, min: values[0].toString(), max: values[1].toString() })
  // }, [])

  // return { onChangeSearchHandler, onChangeValuesHandler }
}
