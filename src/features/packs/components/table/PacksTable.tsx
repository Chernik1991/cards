import * as React from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import { useSearchParams } from 'react-router-dom'

import { PackType } from '../../packs-api'
import { deletePackTC, updatePackTC } from '../../packsReducer'

import { TableRowComponent } from './tableBody/TableRowComponent'
import { TableHeadComponent } from './tableHead/TableHeadComponent'

import { setPackIdAC } from 'features/cards/card/card-reducer'
import { useAppDispatch } from 'store/store'

type Data = {
  name: string
  actions: string
  created_by: string
  updated: string
  cardsCount: string
}
//  with example https://mui.com/material-ui/react-table/

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
  modalHandler: (value: string) => void
}

export const PacksTable = (props: PacksTableType) => {
  const [searchParams, setSearchParams] = useSearchParams()
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
  const [orderBy, setOrderBy] = React.useState<string>('name')

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
    setOrderBy(property)
  }
  const cardsListHandler = (cardsPack_id: string) => {
    console.log(cardsPack_id, 'handleClick')
    setSearchParams({ cardsPack_id: cardsPack_id })
    if (props.userID) {
      setSearchParams({ packUserId: props.userID })
    }
    dispatch(setPackIdAC(cardsPack_id))
    // dispatch(GetCardsTC({ cardsPack_id: cardsPack_id }))
  }

  return (
    <Box sx={{ width: '100%', minWidth: '1000px', padding: '30px 0px' }}>
      {rows.length ? (
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
                  return (
                    <TableRowComponent
                      key={crypto.randomUUID()}
                      row={row}
                      index={index}
                      userID={props.userID}
                      cardsListHandler={cardsListHandler}
                      modalHandler={props.modalHandler}
                    />
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : (
        ''
      )}
    </Box>
  )
}
