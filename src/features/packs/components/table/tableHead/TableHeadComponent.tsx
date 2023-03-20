import React from 'react'

import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import Box from '@mui/material/Box'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import { visuallyHidden } from '@mui/utils'

import { getPacksTC } from '../../../packsReducer'
import { useAppDispatch } from 'store/store'
import { HeadCell } from 'features/packs/components/table/PacksTable'

type TableHeadComponentProps = {
  onRequestSort: (event: React.MouseEvent<unknown>, property: string, sortPacks: string) => void
  orderBy: string
  rowCount: number
  headCells: HeadCell[]
}

export const TableHeadComponent = (props: TableHeadComponentProps) => {
  const [sort, setSort] = useState(1)

  const { orderBy, onRequestSort } = props
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
