import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { Navigate, NavLink } from 'react-router-dom'

import { PacksActions } from 'features/packs/components/table/tableActions/PacksActions'
import { PATH } from 'routes/pages'
import { useAppDispatch } from 'store/store'

type TableRowType = {
  row: ExtendedType
  index: number
  userID: string
  cardsListHandler: (cardsPack_id: string) => void
  modalHandler: (value: string) => void
}

type ExtendedType = {
  name: string
  actions: string
  created_by: string
  updated: string
  cardsCount: number
  id: string
  packOwnerID: string
}

export const TableRowComponent = ({ row, index, userID, cardsListHandler, modalHandler }: TableRowType) => {
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
  const crudAccessValue = row.packOwnerID === userID

  const handleStudying = () => {
    // handleOpen(row.id)

    return <Navigate to={PATH.STUDY} replace />
  }
  const handleDeletePack = () => {
    modalHandler('delete-pack')
    // dispatch(deletePackTC({ id: row.id }, userID))
  }
  const handleUpdatePackName = () => {
    modalHandler('edit-pack')
    // dispatch(updatePackTC({ cardsPack: { _id: row.id, name: 'updated name' } }, userID))
  }

  return (
    <TableRow
      hover
      // onClick={event => handleClick(event, row.name)}
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
}
