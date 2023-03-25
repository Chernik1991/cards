import React, { useState } from 'react'

import { ArrowDropDown } from '@mui/icons-material'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'

type TableHeadComponentProps = {
  onRequestSort: (event: React.MouseEvent<unknown>, property: string, sortPacks: string) => void
  orderBy: string
  rowCount: number
  headCells: any[]
}

export const TableHeadComponent = (props: TableHeadComponentProps) => {
  const { orderBy, onRequestSort } = props
  const [sort, setSort] = useState(+orderBy.slice(0, 0) || 1)
  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    const sortPacks = sort + property

    onRequestSort(event, property, sortPacks)
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
            sx={{ backgroundColor: '#efefef', padding: '15px 30px' }}
          >
            <TableSortLabel
              active={orderBy.slice(1) === headCell.id}
              direction={sort ? 'desc' : 'asc'}
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
