import * as React from 'react'

import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { Navigate, NavLink } from 'react-router-dom'

import { defaultCover } from 'common/constans/constans'
import { pageCountCardsAC, setCardsPackIdAC, setPackNameAC, setPrivatePackAC } from 'features/cards/cards-reducer'
import o from 'features/modals/EditCard/EditCardModal.module.css'
import { ActionsPanel } from 'features/packs/components/actionsPanel/ActionsPanel'
import { pagePacksAC, setDeskCoverAC } from 'features/packs/packsReducer'
import y from 'features/profile/Profile.module.css'
import { PATH } from 'routes/pages'
import { useAppDispatch } from 'store/store'

type TableRowType = {
  row: ExtendedType
  index: number
  userID: string
  modalHandler: (value: string) => void
}

type ExtendedType = {
  name: string
  actions: string
  created_by: string
  updated: string
  cardsCount: number
  id: string
  user_id: string
  private: boolean
  deckCover: string
}

export const TableRowComponent = ({ row, index, userID, modalHandler }: TableRowType) => {
  const dispatch = useAppDispatch()
  const labelId = `enhanced-table-checkbox-${index}`
  const finalDate = new Date(row.updated).toLocaleString()
  const paddingStyle = { padding: '15px 30px', minWidth: '240px' }
  const crudAccessValue = row.user_id === userID

  const handleStudying = () => {
    dispatch(setCardsPackIdAC(row.id))
    dispatch(pageCountCardsAC(row.cardsCount))

    return <Navigate to={PATH.LEARN} replace />
  }
  const handleDeletePack = () => {
    dispatch(setCardsPackIdAC(row.id))
    dispatch(setPackNameAC(row.name))
    modalHandler('delete-pack')
  }
  const handleUpdatePackName = () => {
    dispatch(setPackNameAC(row.name))
    dispatch(setCardsPackIdAC(row.id))
    dispatch(setPrivatePackAC(row.private))
    dispatch(setDeskCoverAC(row.deckCover))
    dispatch(pagePacksAC(1))
    modalHandler('edit-pack')
  }
  const cardsListHandler = (cardsPack_id: string) => {
    dispatch(setCardsPackIdAC(cardsPack_id))
  }

  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={crypto.randomUUID()}>
      <TableCell component="th" id={labelId} scope="row" sx={paddingStyle}>
        <NavLink to={PATH.CARD} onClick={() => cardsListHandler(row.id)}>
          <div className={o.selectCover}>
            <img src={row.deckCover ? row.deckCover : defaultCover} className={y.deckCover} alt="ava" />
            {row.name}
          </div>
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
      <TableCell align="left" sx={paddingStyle}>
        <ActionsPanel
          crudAccess={crudAccessValue}
          handleStudyingUp={handleStudying}
          handleUpdate={handleUpdatePackName}
          handleDelete={handleDeletePack}
        />
      </TableCell>
    </TableRow>
  )
}
