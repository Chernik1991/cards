import * as React from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { NavLink } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from 'app/store'
import { GetCardsTC } from 'features/cards/card/card-reducer'
import { CardsType } from 'features/cards/cards-api'
import s from 'features/profile/profile.module.css'

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
      <Box
        sx={{
          gridArea: 'left',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingTop: 4,
        }}
      >
        <NavLink className={s.backContainer} to="#">
          <svg className={s.backArrow} viewBox="0 0 512 512">
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z" />
          </svg>
          <span> Back to Packs List</span>
        </NavLink>
      </Box>
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
