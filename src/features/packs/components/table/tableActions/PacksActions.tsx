import TableCell from '@mui/material/TableCell'
import { NavLink } from 'react-router-dom'

import { menuDataInfo } from 'features/cards/cardMenu/CardData'
import e from 'features/packs/components/table/tableActions/PacksActions.module.css'
import { PATH } from 'routes/pages'

type PacksActionsType = {
  sx: Object
  crudAccess: boolean
  align: 'left' | 'center' | 'right' | 'justify' | 'inherit' | undefined
  handleStudyingUp: () => void
  handleUpdatePackNameUp: () => void
  handleDeletePackUp: () => void
}

export const PacksActions = ({
  align,
  sx,
  crudAccess,
  handleStudyingUp,
  handleUpdatePackNameUp,
  handleDeletePackUp,
}: PacksActionsType) => {
  const EditPackJSX = <span onClick={handleUpdatePackNameUp}>{menuDataInfo[0].icon}</span>
  const crudPanel = (
    <>
      {EditPackJSX}
      <span onClick={handleDeletePackUp}>{menuDataInfo[1].icon}</span>
    </>
  )

  return (
    <TableCell align={align} sx={sx}>
      <div className={e.actionsContainer}>
        <NavLink to={PATH.LEARN} onClick={handleStudyingUp}>
          {menuDataInfo[2].icon}
        </NavLink>
        {crudAccess ? crudPanel : ''}
      </div>
    </TableCell>
  )
}
