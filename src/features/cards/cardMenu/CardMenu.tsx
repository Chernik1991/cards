import { useState } from 'react'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Navigate } from 'react-router-dom'

import { SuperCard } from 'common/components/c12-SuperCard/SuperCard'
import { menuDataInfo } from 'features/cards/cardMenu/CardData'
import s from 'features/cards/cardMenu/CardMenu.module.css'
import { Modals } from 'features/modals/Modals'
import { PATH } from 'routes/pages'

export const CardMenu = () => {
  const [activeMenu, setActiveMenu] = useState(false)
  const [open, setOpen] = useState('false')
  const randomID = crypto.randomUUID()
  const menuActiveHandler = () => {
    setActiveMenu(!activeMenu)
  }
  const handleOpen = (value: string) => {
    if (value === 'Edit') {
      setOpen('edit-pack')
    }
    if (value === 'Delete') {
      setOpen('delete-pack')

      return <Navigate to={PATH.PACKS} replace />
    }
    if (value === 'Learn') {
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
