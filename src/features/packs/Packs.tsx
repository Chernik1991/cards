import Box from '@mui/material/Box'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { Navigate } from 'react-router-dom'

import { PackType, ResponsePacksType } from './packs-api'
import e from './Packs.module.css'
import { addPackTC } from './packsReducer'
import EnhancedTable from './PacksTable'

import { useAppDispatch, useAppSelector } from 'app/store'
import SuperButton from 'common/components/c2-SuperButton/SuperButton'
import { PATH } from 'common/components/Routing/pages'

export const Packs = () => {
  const dispatch = useAppDispatch()
  const userPacks = useAppSelector<ResponsePacksType>(state => state.packs)
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const newPackHandler = () => {
    dispatch(addPackTC())
  }

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} replace />
  }

  // const mappedPacks = userPacks.cardPacks.map((row: PackType) => {
  //   const correctionOfMonth = new Date(row.updated).getMonth() + 1
  //   const correctionOfDataTime = new Date(row.updated).getMonth() < 10 ? '0' + correctionOfMonth : correctionOfMonth

  //   const convertedTime =
  //     new Date(row.updated).getDate() + '.' + correctionOfDataTime + '.' + new Date(row.updated).getFullYear()

  //   return (
  //     <TableRow key={crypto.randomUUID()} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
  //       <TableCell component="th" scope="row" style={{ maxWidth: '200px' }}>
  //         {row.name}
  //       </TableCell>
  //       <TableCell align="right" style={{ maxWidth: '200px' }}>
  //         {row.cardsCount}
  //       </TableCell>
  //       <TableCell align="right" style={{ maxWidth: '200px' }}>
  //         {convertedTime}
  //       </TableCell>
  //       <TableCell align="right" style={{ maxWidth: '200px' }}>
  //         {row.user_name}
  //       </TableCell>
  //       <TableCell align="right" style={{ maxWidth: '200px' }}>
  //         <div>
  //           <div onClick={() => console.log(1)}>{1}</div>
  //           <div onClick={() => console.log(2)}>{2}</div>
  //           <div onClick={() => console.log(3)}>{3}</div>
  //         </div>
  //       </TableCell>
  //     </TableRow>
  //   )
  // })

  return (
    <div className={e.packsContainer}>
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
        <SuperButton className={e.newPackButton} onClick={newPackHandler}>
          Add new pack
        </SuperButton>
      </Box>
      {/* <TableContainer
        component={Paper}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth: '1200px' }}
      >
      <SearchPackPanel />
      <TableContainer component={Paper} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow style={{ fontSize: 'flex', backgroundColor: '#efefef', padding: '50px' }}>
              <TableCell variant="head">Name</TableCell>
              <TableCell align="right">Cards</TableCell>
              <TableCell align="right">Last Updated</TableCell>
              <TableCell align="right">Created by</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{mappedPacks}</TableBody>
        </Table>
      </TableContainer>
      <PaginationComponent
        totalCount={cardPacksTotalCount}
        currentPage={page ?? 1}
        pageSize={pageCount ?? 4}
        onPageChanged={onChangePageHandler}
        labelRowsPerPage={paginationLabel}
      />
    </div>
  )
}
