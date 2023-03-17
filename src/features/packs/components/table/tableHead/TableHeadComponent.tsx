import React from 'react'

import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import Box from '@mui/material/Box'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import { visuallyHidden } from '@mui/utils'

import { getPacksTC } from '../../../packsReducer'
import { HeadCell } from '../PacksTable'

import { PacksParamsType } from 'features/packs/packs-api'
import { setUserParamsAC } from 'features/packs/paramsReducer'
import { useAppDispatch } from 'store/store'

type EnhancedTableProps = {
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  orderBy: string
  rowCount: number
  queryParams: PacksParamsType
  headCells: HeadCell[]
}

export const TableHeadComponent = (props: EnhancedTableProps) => {
  const dispatch = useAppDispatch()
  const [sort, setSort] = React.useState(1)
  const [sortProperety, setSortProperety] = React.useState('name')

  const { orderBy, onRequestSort, queryParams } = props
  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    const newParams = { ...queryParams, sortPacks: sort + property }

    onRequestSort(event, property)
    setSortProperety(orderBy)
    dispatch(setUserParamsAC(newParams))
    dispatch(getPacksTC(newParams))
    if (sort === 0 && sortProperety === orderBy) {
      setSort(1)
    } else {
      setSort(0)
    }
  }

  return (
    <TableHead>
      <TableRow>
        {props.headCells.map(headCell => (
          <TableCell
            key={crypto.randomUUID()}
            align={headCell.numeric ? 'left' : 'right'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            // sortDirection={orderBy === headCell.id ? order : false}
            sx={{ backgroundColor: '#efefef', padding: '15px 30px' }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === sortProperety ? 'desc' : 'asc'}
              onClick={createSortHandler(headCell.id)}
              IconComponent={ArrowDropUp}
              sx={{ fontWeight: '600' }}
            >
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {/* {order === 'desc' ? 'sorted descending' : 'sorted ascending'} */}
                </Box>
              ) : null}
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
