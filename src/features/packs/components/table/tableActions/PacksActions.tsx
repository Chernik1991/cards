import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import SchoolIcon from '@mui/icons-material/School'
import TableCell from '@mui/material/TableCell'
import { NavLink } from 'react-router-dom'

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
  const updatePackJSX = (
    <NavLink to={'#'} onClick={handleUpdatePackNameUp}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleUpdatePackNameUp}
      >
        <path
          d="M19 20H5C4.73478 20 4.48043 20.1054 4.29289 20.2929C4.10536 20.4804 4 20.7348 4 21C4 21.2652 4.10536 21.5196 4.29289 21.7071C4.48043 21.8946 4.73478 22 5 22H19C19.2652 22 19.5196 21.8946 19.7071 21.7071C19.8946 21.5196 20 21.2652 20 21C20 20.7348 19.8946 20.4804 19.7071 20.2929C19.5196 20.1054 19.2652 20 19 20Z"
          fill="black"
        />
        <path
          d="M4.99981 17.9999H5.08981L9.25981 17.6199C9.71661 17.5744 10.1438 17.3731 10.4698 17.0499L19.4698 8.04986C19.8191 7.68083 20.0079 7.18837 19.9948 6.68039C19.9817 6.17242 19.7677 5.69037 19.3998 5.33986L16.6598 2.59986C16.3022 2.26395 15.8336 2.07122 15.3431 2.05831C14.8527 2.0454 14.3746 2.21323 13.9998 2.52986L4.99981 11.5299C4.67657 11.8558 4.47531 12.2831 4.42981 12.7399L3.99981 16.9099C3.98634 17.0563 4.00534 17.204 4.05547 17.3422C4.1056 17.4805 4.18561 17.606 4.28981 17.7099C4.38325 17.8025 4.49406 17.8759 4.6159 17.9256C4.73774 17.9754 4.8682 18.0006 4.99981 17.9999ZM15.2698 3.99986L17.9998 6.72986L15.9998 8.67986L13.3198 5.99986L15.2698 3.99986ZM6.36981 12.9099L11.9998 7.31986L14.6998 10.0199L9.09981 15.6199L6.09981 15.8999L6.36981 12.9099Z"
          fill="black"
        />
      </svg>
    </NavLink>
  )
  const crudPanel = (
    <>
      {updatePackJSX}
      <NavLink to={'#'} onClick={handleDeletePackUp}>
        <DeleteOutlineIcon id="deleteIcon" sx={{ width: '20px' }} />
      </NavLink>
    </>
  )

  return (
    <TableCell align={align} sx={sx}>
      <div className={e.actionsContainer}>
        <NavLink to={PATH.STUDY} onClick={handleStudyingUp}>
          <SchoolIcon id="SchoolIcon" sx={{ width: '20px' }} />
        </NavLink>
        {crudAccess ? crudPanel : ''}
      </div>
    </TableCell>
  )
}
