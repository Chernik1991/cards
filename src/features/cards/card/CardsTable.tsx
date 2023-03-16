import * as React from 'react'

import { Rating } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { useAppDispatch } from 'app/store'
import { DeleteCardsTC, UpdateCardsTC } from 'features/cards/card/card-reducer'
import { CardActions } from 'features/cards/card/CardActions'
import { CardsType } from 'features/cards/cards-api'

type Data = {
  question: string
  grade: number
  last_updated: string
  answer: string
  actions: string
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
  {
    id: 'actions',
    numeric: true,
    disablePadding: false,
    label: '',
  },
]

type HeadCell = {
  disablePadding: boolean
  id: keyof Data
  label: string
  numeric: boolean
}
type EnhancedTableType = {
  cards: CardsType[]
}
export const EnhancedTable = (props: EnhancedTableType) => {
  const dispatch = useAppDispatch()
  const rows = props.cards.map((el: CardsType) => ({
    id: el._id,
    actions: '',
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

  return (
    <Box sx={{ width: '100%', padding: '30px' }}>
      <Paper sx={{ width: '100%', mb: 2, padding: '15px 30px' }}>
        <TableContainer>
          <Table sx={{ minWidth: 850 }} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                {headCells.map(headCell => (
                  <TableCell key={headCell.id} sx={{ backgroundColor: '#efefef' }}>
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`
                const paddingStyle = { padding: '15px 30px', minWidth: '240px' }
                const handleDeleteCard = () => {
                  console.log(row.id, 'handleDeleteCard')
                  dispatch(DeleteCardsTC({ id: row.id, cardsPack_id: row.cardsPack_id }))
                }
                const handleUpdateCardName = () => {
                  console.log(row.cardsPack_id, 'handleUpdateCardName')
                  dispatch(UpdateCardsTC({ question: 'update question', id: row.id, cardsPack_id: row.cardsPack_id }))
                }

                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={crypto.randomUUID()}>
                    <TableCell style={{ minWidth: '200px' }} component="th" id={labelId} scope="row">
                      {row.question}
                    </TableCell>
                    <TableCell align="left">{row.answer}</TableCell>
                    <TableCell align="left">{row.last_updated}</TableCell>
                    <TableCell align="left">
                      <Rating name="half-rating" defaultValue={row.grade} precision={0.5} />
                    </TableCell>
                    <CardActions
                      align="left"
                      sx={{ ...paddingStyle, minWidth: 'none' }}
                      handleUpdateCardName={handleUpdateCardName}
                      handleDeleteCard={handleDeleteCard}
                    />
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
