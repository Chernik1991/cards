import * as React from 'react'

import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

type ModalBasicType = {
  children: React.ReactNode
  handleState: boolean
  handleClose: () => void
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export const ModalBasic = ({ handleState, children, handleClose }: ModalBasicType) => {
  return (
    <div>
      <Modal
        open={handleState}
        onClose={() => handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  )
}
