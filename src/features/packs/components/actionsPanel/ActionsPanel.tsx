import { NavLink } from 'react-router-dom'

import { menuDataInfo } from 'features/cards/cardMenu/CardData'
import e from 'features/packs/components/actionsPanel/ActionsPanel.module.css'
import { PATH } from 'routes/pages'

type Props = {
  crudAccess: boolean
  handleStudyingUp: () => void
  handleUpdate: () => void
  handleDelete: () => void
}
export const ActionsPanel = ({ crudAccess, handleStudyingUp, handleDelete, handleUpdate }: Props) => {
  const crudPanel = (
    <>
      <span onClick={handleUpdate}>{menuDataInfo[0].icon}</span>
      <span onClick={handleDelete}>{menuDataInfo[1].icon}</span>
    </>
  )

  return (
    <div className={e.actionsContainer}>
      <NavLink to={PATH.LEARN} onClick={handleStudyingUp}>
        {menuDataInfo[2].icon}
      </NavLink>
      {crudAccess ? crudPanel : ''}
    </div>
  )
}
