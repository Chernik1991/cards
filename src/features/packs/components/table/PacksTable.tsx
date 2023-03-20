import * as React from 'react'
import { useState } from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import { NavLink } from 'react-router-dom'

import { PackType } from '../../packs-api'
import { deletePackTC, updatePackTC } from '../../packsReducer'

import { PacksActions } from './tableActions/PacksActions'
import { TableHeadComponent } from './tableHead/TableHeadComponent'

import { setPackIdAC } from 'features/cards/card/card-reducer'
import { PATH } from 'routes/pages'
import { useAppDispatch } from 'store/store'

// type Data = {
//   name: string
//   actions: string
//   created_by: string
//   updated: string
//   cardsCount: string
// }
export type HeadCell = {
  disablePadding: boolean
  id: string
  label: string
  numeric: boolean
}
export const headCells: HeadCell[] = [
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'cardsCount',
    numeric: true,
    disablePadding: false,
    label: 'Cards',
  },
  {
    id: 'updated',
    numeric: true,
    disablePadding: false,
    label: 'Last Updated',
  },
  {
    id: 'created_by',
    numeric: true,
    disablePadding: false,
    label: 'Created by',
  },
  {
    id: 'actions',
    numeric: true,
    disablePadding: false,
    label: 'Actions',
  },
]

type PacksTableType = {
  cardsPacks: PackType[]
  userID: string
  userIDsettings: string
  setParamsSorted: (sortPacks: string) => void
}

export const PacksTable = (props: PacksTableType) => {
  const dispatch = useAppDispatch()
  const rows = props.cardsPacks.map((el: PackType) => ({
    name: el.name,
    actions: '',
    created_by: el.user_name,
    updated: el.updated,
    cardsCount: el.cardsCount,
    id: el._id,
    packOwnerID: el.user_id,
  }))
  const [orderBy, setOrderBy] = useState<string>('name')

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: string, sortPacks: string) => {
    setOrderBy(property)
    props.setParamsSorted(sortPacks)
  }
  const cardsListHandler = (cardsPack_id: string) => {
    dispatch(setPackIdAC(cardsPack_id))
  }

  return (
    <Box sx={{ width: '100%', minWidth: '1000px', padding: '30px 0px' }}>
      <Paper sx={{ width: '100%', mb: 2, padding: '0px 0px' }}>
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
                // const [open, setOpen] = React.useState('false')
                // const handleOpen = (value: string) => setOpen(value)
                // const handleClose = () => setOpen('false')
                const dispatch = useAppDispatch()
                const labelId = `enhanced-table-checkbox-${index}`
                const data = new Date(row.updated)
                const monthCorrection = data.getMonth() + 1
                const getMonth = monthCorrection < 10 ? '0' + monthCorrection : monthCorrection
                const finalDate = data.getDate() + '.' + getMonth + '.' + data.getFullYear()
                const paddingStyle = { padding: '15px 30px', minWidth: '240px' }
                const crudAccessValue = row.packOwnerID === props.userID
                const handleStudying = () => {
                  // handleOpen(row.id)
                  // return <Navigate to={PATH.STUDY} replace />
                }
                const handleDeletePack = () => {
                  dispatch(deletePackTC({ id: row.id }, props.userID))
                }
                const handleUpdatePackName = () => {
                  dispatch(updatePackTC({ cardsPack: { _id: row.id, name: 'updated name' } }, props.userID))
                }

                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={crypto.randomUUID()}>
                    <TableCell component="th" id={labelId} scope="row" sx={paddingStyle}>
                      <NavLink to={PATH.CARD} onClick={event => cardsListHandler(row.id)}>
                        {row.name}
                      </NavLink>
                    </TableCell>
                    <TableCell align="left" sx={paddingStyle}>
                      {row.cardsCount}
                    </TableCell>
                    <TableCell align="left" sx={paddingStyle}>
                      {finalDate}
                    </TableCell>
                    <TableCell align="left" sx={{ ...paddingStyle, minWidth: 'none' }}>
                      {row.created_by}
                    </TableCell>
                    <PacksActions
                      align="left"
                      crudAccess={crudAccessValue}
                      sx={{ ...paddingStyle, minWidth: 'none', display: 'flex', width: '150px' }}
                      handleStudyingUp={handleStudying}
                      handleUpdatePackNameUp={handleUpdatePackName}
                      handleDeletePackUp={handleDeletePack}
                      // modalChangeState={handleClose}
                      // modalState={open === row.id}
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
