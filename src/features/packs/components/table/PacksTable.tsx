import * as React from 'react'
import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import { useSearchParams } from 'react-router-dom'

import { TableRowComponent } from 'features/packs/components/table/tableBody/TableRowComponent'
import { TableHeadComponent } from 'features/packs/components/table/tableHead/TableHeadComponent'
import { CardPacksType } from 'features/packs/packs-api'
import { sortPacksAC } from 'features/packs/packsReducer'
import { packCardPacks, packSort } from 'features/packs/selectorPack'
import { userIdProfile } from 'features/profile/selectorProfile'
import { useAppDispatch, useAppSelector } from 'store/store'

type HeadCell = {
  disablePadding: boolean
  id: string
  label: string
  numeric: boolean
}
const headCells: HeadCell[] = [
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
  modalHandler: (value: string) => void
}

export const PacksTable = (props: PacksTableType) => {
  // console.log('PacksTable')
  const cardPacks = useAppSelector(packCardPacks)
  const userID = useAppSelector(userIdProfile)
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const sort = useAppSelector(packSort)
  const rows = cardPacks.map((el: CardPacksType) => ({
    name: el.name,
    actions: '',
    created_by: el.user_name,
    updated: el.updated,
    cardsCount: el.cardsCount,
    id: el._id,
    packOwnerID: el.user_id,
    private: el.private,
  }))
  const [orderBy, setOrderBy] = useState<string>(sort)

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: string, sortPacks: string) => {
    setOrderBy(property)
    dispatch(sortPacksAC(sortPacks))
  }

  useEffect(() => {
    setOrderBy(params.sortPacks || sort)
    dispatch(sortPacksAC(params.sortPacks || sort))
  }, [params.sortPacks])

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
                return (
                  <TableRowComponent
                    key={crypto.randomUUID()}
                    row={row}
                    index={index}
                    userID={userID}
                    modalHandler={props.modalHandler}
                  />
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}
