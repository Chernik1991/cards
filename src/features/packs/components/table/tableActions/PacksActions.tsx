import TableCell from '@mui/material/TableCell'

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
  const EditPackJSX = <a onClick={handleUpdatePackNameUp}>{menuDataInfo[0].icon}</a>
  const crudPanel = (
    <>
      {EditPackJSX}
      <a onClick={handleDeletePackUp}>{menuDataInfo[1].icon}</a>
    </>
  )

  return (
    <TableCell align={align} sx={sx}>
      <div className={e.actionsContainer}>
        <a href={PATH.LEARN} onClick={handleStudyingUp}>
          {menuDataInfo[2].icon}
        </a>
        {crudAccess ? crudPanel : ''}
      </div>
    </TableCell>
  )
}
