import { ChangeEvent, FC, MouseEvent, useEffect, useState } from 'react'

import TablePagination from '@mui/material/TablePagination'

import { useThrottle } from 'common/hooks/useTrottle'
import { PacksParamsType } from 'features/packs/packs-api'
// import { setUserParamsAC } from 'features/packs/paramsReducer'
import { useAppDispatch } from 'store/store'

type PaginationComponentPropsType = {
  labelRowsPerPage?: string
  totalCount: number
  currentPage: number
  pageSize: number
  restParams: PacksParamsType
  onPageChanged: (page: number, pageCount: number) => void
}

export const PaginationComponent: FC<PaginationComponentPropsType> = ({
  totalCount,
  pageSize,
  restParams,
  onPageChanged,
  currentPage,
  labelRowsPerPage,
}) => {
  const [rowsPerPage, setRowsPerPage] = useState(pageSize)
  const [page, setPage] = useState(currentPage)
  const throttledPage = useThrottle(page, 3000)
  const dispatch = useAppDispatch()

  console.log(page)

  useEffect(() => {
    setRowsPerPage(pageSize)
  }, [pageSize])

  useEffect(() => {
    setPage(currentPage)
  }, [currentPage])

  useEffect(() => {
    onPageChanged(page, rowsPerPage)
  }, [rowsPerPage, throttledPage])

  const onChangeRowsPerPageHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
  }
  const onChangePageHandler = (event: MouseEvent<HTMLButtonElement> | null, page: number) => {
    // dispatch(setUserParamsAC({ ...restParams, page: page + 1 }))
    setPage(page + 1)
  }

  return (
    <TablePagination
      component="div"
      labelRowsPerPage={labelRowsPerPage}
      count={totalCount}
      page={currentPage - 1}
      onPageChange={onChangePageHandler}
      rowsPerPageOptions={[4, 8, 10]}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={onChangeRowsPerPageHandler}
      showFirstButton
      showLastButton
    />
  )
}
