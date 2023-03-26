import { useState } from 'react'

import MoreVertIcon from '@mui/icons-material/MoreVert'

import { menuDataInfo } from './CardData'
import s from './CardMenu.module.css'

import { SuperCard } from 'common/components/c12-SuperCard/SuperCard'

export const CardMenu = () => {
  const [activeMenu, setActiveMenu] = useState(false)
  const randomID = crypto.randomUUID()
  const active = (
    <div className={s.profileInfoStyle}>
      <SuperCard cardStyle={s.menuContainer} menuData={menuDataInfo} />
      <div className={s.arrowUp} />
    </div>
  )

  return (
    <div className={s.menu}>
      <input type="text" style={{ position: 'absolute', marginLeft: '-900px' }} id={randomID} />
      <label className={s.labelStyle} htmlFor="" onClick={() => setActiveMenu(!activeMenu)} id={randomID}>
        <MoreVertIcon className={s.packInfo} id={randomID} />
      </label>

      {activeMenu ? active : ''}
    </div>
  )
}
