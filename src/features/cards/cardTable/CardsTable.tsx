import * as React from 'react'
import { useEffect, useState } from 'react'

import { Rating } from '@mui/material'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import { useSearchParams } from 'react-router-dom'

import { CardsType } from 'features/cards/cards-api'
import { cardAnswerAC, cardQuestionAC, setCardIdAC, setCardsPackIdAC, sortCardsAC } from 'features/cards/cards-reducer'
import { CardActions } from 'features/cards/cardTable/CardActions'
import * as cardsSelectors from 'features/cards/selectorCard'
import { TableHeadComponent } from 'features/packs/components/table/tableHead/TableHeadComponent'
import { sortPacksAC } from 'features/packs/packsReducer'
import * as profileSelectors from 'features/profile/selectorProfile'
import { useAppDispatch, useAppSelector } from 'store/store'

type HeadCell = {
  disablePadding: boolean
  id: string
  label: string
  numeric: boolean
}

const headCells: HeadCell[] = [
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
    id: 'updated',
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

type Props = {
  modalHandler: (value: string) => void
}
export const CardsTable = (props: Props) => {
  const dispatch = useAppDispatch()
  const cards = useAppSelector<Array<CardsType>>(cardsSelectors.cards)
  const userId = useAppSelector(profileSelectors._id)
  const sort = useAppSelector(cardsSelectors.sortCards)
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const rows = cards.map((el: CardsType) => ({
    card_id: el._id,
    cardsPack_id: el.cardsPack_id,
    user_id: el.user_id,
    question: el.question,
    answer: el.answer,
    grade: el.grade,
    shots: el.shots,
    created: el.created,
    last_updated: new Date(el.updated).toLocaleString(),
  }))
  const [orderBy, setOrderBy] = useState(sort)

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: string, sortCards: string) => {
    setOrderBy(property)
    dispatch(sortCardsAC(sortCards))
  }

  useEffect(() => {
    setOrderBy(params.sortCards || sort)
    dispatch(sortPacksAC(params.sortCards || sort))
  }, [params.sortCards])

  return (
    <Box sx={{ width: '100%', padding: '30px' }}>
      <Paper sx={{ width: '100%', mb: 2, padding: '15px 30px' }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
            <TableHeadComponent
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {rows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`
                const paddingStyle = { padding: '15px 30px', minWidth: '240px' }

                const handleDeleteCard = () => {
                  dispatch(setCardIdAC(row.card_id))
                  dispatch(setCardsPackIdAC(row.cardsPack_id))
                  props.modalHandler('delete-card')
                }
                const handleUpdateCardName = () => {
                  console.log(row.cardsPack_id, 'handleUpdateCardName')
                  dispatch(cardQuestionAC(row.question))
                  dispatch(cardAnswerAC(row.answer))
                  dispatch(setCardIdAC(row.card_id))
                  dispatch(setCardsPackIdAC(row.cardsPack_id))
                  props.modalHandler('edit-card')
                }

                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={crypto.randomUUID()}>
                    <TableCell
                      style={{ minWidth: '200px', cursor: 'pointer' }}
                      component="th"
                      id={labelId}
                      scope="row"
                      onClick={handleUpdateCardName}
                    >
                      {row.question}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{ minWidth: '200px', cursor: 'pointer' }}
                      onClick={handleUpdateCardName}
                    >
                      {row.answer}
                    </TableCell>
                    <TableCell align="left">{row.last_updated}</TableCell>
                    <TableCell align="left">
                      <Rating name="read-only" value={row.grade} readOnly precision={0.1} />
                    </TableCell>
                    {userId === row.user_id ? (
                      <CardActions
                        align="left"
                        sx={{ ...paddingStyle, minWidth: 'none' }}
                        handleUpdateCardName={handleUpdateCardName}
                        handleDeleteCard={handleDeleteCard}
                      />
                    ) : (
                      ''
                    )}
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
