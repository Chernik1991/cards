import * as React from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import { Navigate, NavLink } from 'react-router-dom'

import { PacksParamsType, PackType } from '../../packs-api'
import { deletePackTC, updatePackTC } from '../../packsReducer'

import PacksActions from './PacksActions'
import { TableHeadComponent } from './tableHead/TableHeadComponent'

import { GetCardsTC, setPackIdAC } from 'features/cards/card/card-reducer'
import { PATH } from 'routes/pages'
import { useAppDispatch } from 'store/store'

type Data = {
  name: string
  actions: string
  created_by: string
  updated: string
  cards: string
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)

export type HeadCell = {
  disablePadding: boolean
  id: keyof Data
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
    id: 'cards',
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

type EnhancedTableType = {
  cardsPacks: PackType[]
  userID: string
  userIDsettings: string | null | undefined
  queryParams: PacksParamsType
}

export const EnhancedTable = (props: EnhancedTableType) => {
  const dispatch = useAppDispatch()
  const rows = props.cardsPacks.map((el: PackType) => ({
    name: el.name,
    actions: '',
    created_by: el.user_name,
    updated: el.updated,
    cards: el.cardsCount,
    id: el._id,
    packOwnerID: el.user_id,
  }))
  // const [order, setOrder] = React.useState<Order>('desc')
  const [orderBy, setOrderBy] = React.useState<string>('name')
  const [selected, setSelected] = React.useState<readonly string[]>([])

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
    // const isAsc = orderBy === property && order === 'asc'

    // setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map(n => n.name)

      setSelected(newSelected)

      return
    }
    setSelected([])
  }
  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected: readonly string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }

    setSelected(newSelected)
  }
  const cardsListHandler = (cardsPack_id: string) => {
    console.log(cardsPack_id, 'handleClick')
    dispatch(setPackIdAC(cardsPack_id))
    dispatch(GetCardsTC({ cardsPack_id: cardsPack_id }))
  }

  return (
    <Box sx={{ width: '90%', maxWidth: '1400px', minWidth: '1000px', padding: '30px 0px' }}>
      {rows.length ? (
        <Paper sx={{ width: '100%', mb: 2, padding: '0px 0px' }}>
          <TableContainer>
            {}
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
              <TableHeadComponent
                numSelected={selected.length}
                // order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                queryParams={props.queryParams}
                headCells={headCells}
              />
              <TableBody>
                {rows.map((row, index) => {
                  const dispatch = useAppDispatch()
                  const labelId = `enhanced-table-checkbox-${index}`
                  const data = new Date(row.updated)
                  const monthCorrection = data.getMonth() + 1
                  const getMonth = monthCorrection < 10 ? '0' + monthCorrection : monthCorrection
                  const finalDate = data.getDate() + '.' + getMonth + '.' + data.getFullYear()
                  const paddingStyle = { padding: '15px 30px', minWidth: '240px' }
                  const crudAccessValue = row.packOwnerID === props.userID
                  const handleStudying = () => {
                    // dispatch(logoutTC())

                    return <Navigate to={PATH.STUDY} replace />
                  }
                  const handleDeletePack = () => {
                    dispatch(deletePackTC({ id: row.id }, props.userIDsettings))
                  }
                  const handleUpdatePackName = () => {
                    dispatch(updatePackTC({ cardsPack: { _id: row.id, name: 'updated name' } }, props.userIDsettings))
                  }

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row.name)}
                      role="checkbox"
                      tabIndex={-1}
                      key={crypto.randomUUID()}
                    >
                      <TableCell component="th" id={labelId} scope="row" sx={paddingStyle}>
                        <NavLink to={PATH.CARD} onClick={event => cardsListHandler(row.id)}>
                          {row.name}
                        </NavLink>
                      </TableCell>
                      <TableCell align="left" sx={paddingStyle}>
                        {row.cards}
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
                      />
                    </TableRow>
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