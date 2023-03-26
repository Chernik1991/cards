import { useState } from 'react'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Navigate } from 'react-router-dom'

import { menuDataInfo } from './CardData'
import s from './CardMenu.module.css'

import { ModalBasic } from 'common/components/c11-SuperModal/ModalBasic'
import { SuperCard } from 'common/components/c12-SuperCard/SuperCard'
import { setPackNameAC } from 'features/cards/cards-reducer'
import * as cardsSelectors from 'features/cards/selectorCard'
import { DeletePack } from 'features/packs/modals/DeletePack/DeletePack'
import { EditPack } from 'features/packs/modals/EditPack/EditPack'
import {
  addNewUserPackAC,
  clearUserStateTypeAC,
  updateUserPackIDAC,
  updateUserPackPrivateAC,
} from 'features/packs/modals/modalsReducer'
import { deletePackTC, updatePackTC } from 'features/packs/packsReducer'
import {
  packAdditionalSettings,
  packAdditionalSettingsName,
  packAdditionalSettingsPrivate,
} from 'features/packs/selectorPack'
import { PATH } from 'routes/pages'
import { useAppDispatch, useAppSelector } from 'store/store'

export const CardMenu = () => {
  const packsAdditionalSettings = useAppSelector(packAdditionalSettings)
  const packsAdditionalSettingsName = useAppSelector(packAdditionalSettingsName)
  const packsAdditionalSettingsPrivate = useAppSelector(packAdditionalSettingsPrivate)
  const packName = useAppSelector(cardsSelectors.packName)
  const packPrivate = useAppSelector(cardsSelectors.packUserPrivate)
  const packUserId = useAppSelector(cardsSelectors.packUserId)
  const dispatch = useAppDispatch()
  const [activeMenu, setActiveMenu] = useState(false)
  const [open, setOpen] = useState('false')
  const [error, setError] = useState(false)
  const randomID = crypto.randomUUID()

  const menuActiveHandler = () => {
    setActiveMenu(!activeMenu)
  }
  const handleOpen = (value: string) => {
    setOpen(value)
    if (value === 'Edit') {
      dispatch(addNewUserPackAC(packName))
      dispatch(updateUserPackPrivateAC(packPrivate))
      dispatch(updateUserPackIDAC(packUserId || ''))
    }
    if (value === 'Delete') {
      dispatch(addNewUserPackAC(packName))
    }
    if (value === 'Learn') {
      dispatch(updateUserPackIDAC(packUserId || ''))

      return <Navigate to={PATH.LEARN} replace />
    }
  }
  const handleClose = () => {
    dispatch(clearUserStateTypeAC())
    setOpen('false')
  }
  const updatePack = () => {
    if (packsAdditionalSettings.name) {
      dispatch(
        updatePackTC({
          _id: packUserId,
          name: packsAdditionalSettings.name,
          private: packsAdditionalSettings.private,
        })
      )
      dispatch(setPackNameAC(packsAdditionalSettings.name))
      handleClose()
    } else {
      setError(true)
      setTimeout(() => setError(false), 3000)
    }
  }
  const deletePack = () => {
    dispatch(deletePackTC(packsAdditionalSettings._id))
    handleClose()
  }

  const active = (
    <div className={s.profileInfoStyle}>
      <SuperCard cardStyle={s.menuContainer} menuData={menuDataInfo} menuCardHandler={handleOpen} maxHeight={'120px'} />
      <div className={s.arrowUp} />
    </div>
  )

  return (
    <div className={s.menu}>
      <input type="text" style={{ position: 'absolute', marginLeft: '-900px' }} id={randomID} />
      <label className={s.labelStyle} htmlFor="" onClick={menuActiveHandler} id={randomID}>
        <MoreVertIcon className={s.packInfo} id={randomID} />
      </label>

      {activeMenu ? active : ''}
      <ModalBasic
        modalName={'Edit pack'}
        deleteSave={false}
        handleState={open === 'Edit'}
        handleClose={handleClose}
        handleModalFn={updatePack}
      >
        <EditPack
          packStatus={packsAdditionalSettingsPrivate}
          packName={packsAdditionalSettingsName}
          error={
            error ? <span style={{ fontSize: '10px', position: 'relative', top: '60px' }}>Pack name required</span> : ''
          }
        />
      </ModalBasic>
      <ModalBasic
        modalName={'Delete pack'}
        deleteSave={true}
        handleState={open === 'Delete'}
        handleClose={handleClose}
        handleModalFn={deletePack}
      >
        <DeletePack packName={packsAdditionalSettingsName} />
      </ModalBasic>
    </div>
  )
}
