import { useEffect } from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { Navigate, NavLink } from 'react-router-dom'

import { PackType, ResponsePacksType } from './packs-api'
import s from './Packs.module.css'
import { addPackTC, getPacksTC } from './packsReducer'

import { useAppDispatch, useAppSelector } from 'app/store'
import SuperButton from 'common/components/c2-SuperButton/SuperButton'
import { PATH } from 'common/components/Routing/pages'

export const Packs = () => {
  const dispatch = useAppDispatch()
  const userPacks = useAppSelector<ResponsePacksType>(state => state.packs)
  // const userPhoto = userProfileData.avatar ? userProfileData.avatar : ''

  console.log(userPacks)

  // useEffect(() => {
  //   dispatch(getPacksTC())
  // }, [])
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

  const newPackHandler = () => {
    dispatch(addPackTC())
  }

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} replace />
  }

  const mappedPacks = userPacks.cardPacks.map((row: PackType) => {
    const correctionOfMonth = new Date(row.updated).getMonth() + 1
    const correctionOfDataTime = new Date(row.updated).getMonth() < 10 ? '0' + correctionOfMonth : correctionOfMonth

    const convertedTime =
      new Date(row.updated).getDate() + '.' + correctionOfDataTime + '.' + new Date(row.updated).getFullYear()

    return (
      <TableRow key={crypto.randomUUID()} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.cardsCount}</TableCell>
        <TableCell align="right">{convertedTime}</TableCell>
        <TableCell align="right">{row.user_name}</TableCell>
        <TableCell align="right">
          <div>
            <div onClick={() => console.log(1)}>{1}</div>
            <div onClick={() => console.log(2)}>{2}</div>
            <div onClick={() => console.log(3)}>{3}</div>
          </div>
        </TableCell>
      </TableRow>
    )
  })

  return (
    <div className={s.packsContainer}>
      <Box
        sx={{
          gridArea: 'left',
          width: '80%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 4,
        }}
      >
        <h2>Packs list</h2>
        <SuperButton className={s.newPackButton} onClick={newPackHandler}>
          Add new pack
        </SuperButton>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Cards</TableCell>
              <TableCell align="right">Last Updated</TableCell>
              <TableCell align="right">Created by</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{mappedPacks}</TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
