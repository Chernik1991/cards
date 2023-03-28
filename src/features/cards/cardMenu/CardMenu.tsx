import { useState } from 'react'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Navigate } from 'react-router-dom'

import { menuDataInfo } from './CardData'
import s from './CardMenu.module.css'

import { SuperCard } from 'common/components/c12-SuperCard/SuperCard'
import { setCardsPackIdAC, setPackNameAC, setPrivatePackAC } from 'features/cards/cards-reducer'
import * as cardsSelectors from 'features/cards/selectorCard'
import { Modals } from 'features/packs/modals/modals'
import { PATH } from 'routes/pages'
import { useAppDispatch, useAppSelector } from 'store/store'

export const CardMenu = () => {
  const packName = useAppSelector(cardsSelectors.packName)
  const packUserId = useAppSelector(cardsSelectors.packUserId)
  const packPrivate = useAppSelector(cardsSelectors.packPrivate)
  const dispatch = useAppDispatch()
  const [activeMenu, setActiveMenu] = useState(false)
  const [open, setOpen] = useState('false')
  const randomID = crypto.randomUUID()
  //TODO
  const menuActiveHandler = () => {
    setActiveMenu(!activeMenu)
  }
  const handleOpen = (value: string) => {
    setOpen(value)
    if (value === 'edit-pack') {
      dispatch(setPackNameAC(packName))
      dispatch(setPrivatePackAC(packPrivate))
      dispatch(setCardsPackIdAC(packUserId))
    }
    if (value === 'delete-pack') {
      dispatch(setPackNameAC(packName))
    }
    if (value === 'Learn') {
      dispatch(setCardsPackIdAC(packUserId || ''))

      return <Navigate to={PATH.LEARN} replace />
    }
  }

  const active = (
    <div className={s.profileInfoStyle}>
      <div className={s.menuClosing} />
      <SuperCard cardStyle={s.menuContainer} menuData={menuDataInfo} menuCardHandler={handleOpen} maxHeight={'120px'} />
      <div className={s.arrowUp} />
    </div>
  )

  return (
    <div className={s.menu} onClick={menuActiveHandler}>
      <input type="text" style={{ position: 'absolute', marginLeft: '-900px' }} id={randomID} />
      <label className={s.labelStyle} htmlFor="" onClick={menuActiveHandler} id={randomID}>
        <MoreVertIcon className={s.packInfo} id={randomID} />
      </label>

      {activeMenu ? active : ''}
      <Modals setOpen={setOpen} open={open} />
    </div>
  )
}
