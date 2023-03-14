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

import { PaginationComponent } from '../../packs/PaginationComponent'

import { useAppDispatch, useAppSelector } from 'app/store'
import { PATH } from 'common/components/Routing/pages'
import { CreateCardsTC, DeleteCardsTC, GetCardsTC, UpdateCardsTC } from 'features/cards/card/card-reducer'
import { CardsType } from 'features/cards/cards-api'
import { getPacksTC } from 'features/packs/packsReducer'
import s from 'features/profile/Profile.module.css'

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
  const rows = useAppSelector<Array<CardsType>>(state => state.cards.cards)
  const getIdPack = useAppSelector<string>(state => state.packs.cardPacks[0]._id)
  const getIdUser = useAppSelector<string>(state => state.profile._id)

  // useLayoutEffect(() => {
  //   dispatch(GetCardsTC({ cardsPack_id: getIdPack }))
  // }, [])
  const packsListHandler = () => {
    dispatch(getPacksTC({ params: { user_id: null } }))
  }
  const getcardHendler = () => {
    dispatch(GetCardsTC({ cardsPack_id: getIdPack }))
  }
  const postcardHendler = () => {
    dispatch(
      CreateCardsTC({
        card: {
          answer: '123',
          question: '1235555',
          cardsPack_id: getIdPack,
        },
      })
    )
  }
  const delcardHendler = () => {
    dispatch(DeleteCardsTC({ id: '640cd015893e3319116cae74' }))
  }
  const updatecardHendler = () => {
    dispatch(UpdateCardsTC({ card: { _id: '640cda35893e3319116cafdd', question: '111111111' } }))
  }

  const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
  const currentPage = useAppSelector(state => state.cards.page)
  const pageCount = useAppSelector(state => state.cards.pageCount)
  const paginationLabel = 'Cards per Page'

  const onChangePageHandler = () => {
    /*dispatch(setCardsCurrentPageAC(res.data))
    dispatch(setCardsPageCountAC(res.data))*/
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        margin: '40px 50px 0px 50px',
      }}
    >
      <div>
        <button onClick={getcardHendler}>get card</button>
        <button onClick={postcardHendler}>new card</button>
        <button onClick={delcardHendler}>del card</button>
        <button onClick={updatecardHendler}>update card</button>
      </div>

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
        <NavLink className={s.backContainer} to={PATH.PACKS} onClick={packsListHandler}>
          <svg className={s.backArrow} viewBox="0 0 512 512">
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z" />
          </svg>
          <span> Back to Packs List</span>
        </NavLink>
      </Box>
      <TableContainer component={Paper} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
      <PaginationComponent
        totalCount={cardsTotalCount}
        currentPage={currentPage}
        pageSize={pageCount}
        onPageChanged={onChangePageHandler}
        labelRowsPerPage={paginationLabel}
      />
    </div>
  )
}
