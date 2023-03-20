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

import { useAppDispatch } from 'store/store'

type TableHeadComponentProps = {
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void
  orderBy: string
  rowCount: number
  headCells: HeadCell[]
}

export const TableHeadComponent = (props: TableHeadComponentProps) => {
  const dispatch = useAppDispatch()
  const [sort, setSort] = React.useState(1)
  const [sortProperety, setSortProperety] = React.useState('name')

  const { orderBy, onRequestSort } = props
  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    const newParams = { sortPacks: sort + property }

    onRequestSort(event, property)
    setSortProperety(orderBy)
    // dispatch(setUserParamsAC(newParams))
    dispatch(getPacksTC(newParams))
    if (sort === 0) {
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
              direction={sort ? 'asc' : 'desc'}
              onClick={createSortHandler(headCell.id)}
              IconComponent={ArrowDropDown}
              sx={{ fontWeight: '600' }}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
