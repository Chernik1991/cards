import { ChangeEvent, FC, MouseEvent, useEffect, useState } from 'react'

import TablePagination from '@mui/material/TablePagination'

import { useThrottle } from 'common/hooks/useTrottle'

type PaginationComponentPropsType = {
  labelRowsPerPage?: string
  totalCount: number
  currentPage: number
  pageSize: number
  onPageChanged: (page: number, pageCount: number) => void
}

export const PaginationComponent: FC<PaginationComponentPropsType> = ({
  totalCount,
  pageSize,
  onPageChanged,
  currentPage,
  labelRowsPerPage,
}) => {
  const [rowsPerPage, setRowsPerPage] = useState(pageSize)
  const [page, setPage] = useState(currentPage)
  const throttledPage = useThrottle(page, 2000)

  useEffect(() => {
    setPage(currentPage)
    setRowsPerPage(pageSize)
  }, [pageSize, currentPage])

  useEffect(() => {
    onPageChanged(page, rowsPerPage)
  }, [rowsPerPage, throttledPage])

  const onChangeRowsPerPageHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
  }
  const onChangePageHandler = (event: MouseEvent<HTMLButtonElement> | null, page: number) => {
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
