import * as React from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { useAppDispatch, useAppSelector } from 'app/store'
import { GetCardsTC } from 'features/cards/card/card-reducer'
import { CardsType } from 'features/cards/cards-api'

// function createData(question: string, answer: string, lastUpdated: number, grade: number, protein: number) {
//   return { question, answer, lastUpdated, grade }

// const rows = useAppSelector<any>(state => state.cards.data)
// const rows = [
//   //   cards.map((c: any) => c),
//   //   // // cards.map((c: any) => c.answer),
//   //   // // cards,
//   createData('Ice cream sandwich', '159', 6.0, 24, 4.0),
//   createData('Ice cream sandwich', '237', 9.0, 37, 4.3),
//   createData('Eclair', '262', 16.0, 24, 6.0),
//   createData('Cupcake', '305', 3.7, 67, 4.3),
//   createData('Gingerbread', '356', 16.0, 49, 3.9),

export const Card = () => {
  const dispatch = useAppDispatch()
  const rows = useAppSelector<Array<CardsType>>(state => state.cards.data.cards)
  const getcardHendler = () => {
    dispatch(GetCardsTC({ cardsPack_id: '640c5917893e3319116c7fc5' }))
  }

  return (
    <>
      <button onClick={getcardHendler}>get card</button>
      <div>{rows[0]._id}</div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell align="right">Answer</TableCell>
              <TableCell align="right">Last Updated</TableCell>
              <TableCell align="right">Grade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any) => (
              <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.question}
                </TableCell>
                <TableCell align="right">{row.answer}</TableCell>
                <TableCell align="right">{row.updated}</TableCell>
                <TableCell align="right">{row.grade}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      ;
    </>
  )
}
