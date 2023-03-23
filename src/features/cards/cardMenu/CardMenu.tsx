import { useState } from 'react'

import MoreVertIcon from '@mui/icons-material/MoreVert'

import { menuDataInfo } from './CardData'
import s from './CardMenu.module.css'

import { SuperCard } from 'common/components/c12-SuperCard/SuperCard'
import { useAppDispatch, useAppSelector } from 'store/store'
// import { packAdditionalSettings } from 'features/packs/selectorPack'
// import { deletePackTC, updatePackTC } from 'features/packs/packsReducer'
// import { clearUserStateTypeAC } from 'features/packs/modals/modalsReducer'

export const CardMenu = () => {
  // const packsAdditionalSettings = useAppSelector(packAdditionalSettings)
  // const dispatch = useAppDispatch()
  const [activeMenu, setActiveMenu] = useState(false)
  const [open, setOpen] = useState('false')
  const [error, setError] = useState(false)
  const randomID = crypto.randomUUID()
  // const onBlurCallback = (e: React.FocusEvent<HTMLInputElement>) => {
  //   console.log(1)

  //   if (e.relatedTarget?.id === randomID) {
  //     setActiveMenu(!activeMenu)
  //   }
  // }
  // const handleOpen = (value: string) => setOpen(value)
  // const handleClose = () => {
  //   dispatch(clearUserStateTypeAC())
  //   setOpen('false')
  // }
  // const updatePack = () => {
  //   if (packsAdditionalSettings.name) {
  //     dispatch(
  //       updatePackTC({
  //         _id: packsAdditionalSettings._id,
  //         name: packsAdditionalSettings.name,
  //         private: packsAdditionalSettings.private,
  //       })
  //     )
  //     dispatch(clearUserStateTypeAC())
  //     handleClose()
  //   } else {
  //     setError(true)
  //     setTimeout(() => setError(false), 3000)
  //   }
  // }
  // const deletePack = () => {
  //   dispatch(deletePackTC({ id: packsAdditionalSettings._id }))
  //   handleClose()
  // }

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
