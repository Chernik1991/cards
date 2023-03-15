import * as React from 'react'

import { ArrowDropDown } from '@mui/icons-material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import { visuallyHidden } from '@mui/utils'

import { useAppDispatch } from 'app/store'
import { DeleteCardsTC, GetCardsTC, UpdateCardsTC } from 'features/cards/card/card-reducer'
import { CardsType } from 'features/cards/cards-api'

type Data = {
  question: string
  grade: number
  last_updated: string
  answer: string
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }

  return 0
}

type Order = 'asc' | 'desc'

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])

    if (order !== 0) {
      return order
    }

    return a[1] - b[1]
  })

  return stabilizedThis.map(el => el[0])
}

type HeadCell = {
  disablePadding: boolean
  id: keyof Data
  label: string
  numeric: boolean
}

const headCells: readonly HeadCell[] = [
  {
    id: 'question',
    numeric: true,
    disablePadding: false,
    label: 'Question',
  },
  {
    id: 'answer',
    numeric: true,
    disablePadding: false,
    label: 'Answer',
  },
  {
    id: 'last_updated',
    numeric: true,
    disablePadding: false,
    label: 'Last Updated',
  },
  {
    id: 'grade',
    numeric: true,
    disablePadding: false,
    label: 'Grade',
  },
]

type EnhancedTableProps = {
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'left' : 'right'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ backgroundColor: '#efefef' }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              IconComponent={ArrowDropDown}
              sx={{ fontWeight: '600' }}
            >
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
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

type EnhancedTableType = {
  cards: CardsType[]
}
export const EnhancedTable = (props: EnhancedTableType) => {
  const dispatch = useAppDispatch()
  const rows = props.cards.map((el: CardsType) => ({
    id: el._id,
    cardsPack_id: el.cardsPack_id,
    user_id: el.user_id,
    question: el.question,
    answer: el.answer,
    grade: el.grade,
    shots: el.shots,
    comments: el.comments,
    type: el.type,
    rating: el.rating,
    more_id: el.more_id,
    created: el.created,
    last_updated: new Date(el.updated).toLocaleString(),
    __v: el.__v,
  }))
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof Data>('question')
  const [selected, setSelected] = React.useState<readonly string[]>([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc'

    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map(n => n.question)

      setSelected(newSelected)

      return
    }
    setSelected([])
  }
  const handleQuestionClick = (
    event: React.MouseEvent<unknown>,
    newQuestion: string,
    id: string,
    cardsPack_id: string
  ) => {
    console.log(cardsPack_id, 'handleClick')
    dispatch(UpdateCardsTC({ question: newQuestion, id: id, cardsPack_id: cardsPack_id }))
  }
  const handleAnswerClick = (event: React.MouseEvent<unknown>, id: string, cardsPack_id: string) => {
    console.log(id, 'handleAnswerClick')
    dispatch(DeleteCardsTC({ id: id, cardsPack_id: cardsPack_id }))
  }
  const handleClick = (event: React.MouseEvent<unknown>, name: string, cardsPack_id: string) => {
    console.log(cardsPack_id, 'handleClick')
    dispatch(GetCardsTC({ cardsPack_id: cardsPack_id }))
    const selectedIndex = selected.indexOf(name)
    let newSelected: readonly string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }
    setSelected(newSelected)
  }

  const isSelected = (name: string) => selected.indexOf(name) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.

  return (
    <Box sx={{ width: '100%', padding: '30px' }}>
      <Paper sx={{ width: '100%', mb: 2, padding: '15px 30px' }}>
        <TableContainer>
          <Table sx={{ minWidth: 850 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.question)
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      // onClick={event => handleClick(event, row.question, row.cardsPack_id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={crypto.randomUUID()}
                      selected={isItemSelected}
                      // sx={{  }}
                    >
                      <TableCell
                        style={{ minWidth: '200px' }}
                        component="th"
                        id={labelId}
                        scope="row"
                        onClick={event => handleQuestionClick(event, row.question, row.id, row.cardsPack_id)}
                      >
                        {row.question}
                      </TableCell>
                      <TableCell align="left" onClick={event => handleAnswerClick(event, row.id, row.cardsPack_id)}>
                        {row.answer}
                      </TableCell>
                      <TableCell align="left">{row.last_updated}</TableCell>
                      <TableCell align="left">{row.grade}</TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}
