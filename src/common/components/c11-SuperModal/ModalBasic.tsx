import * as React from 'react'

import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

import SuperButton from '../c2-SuperButton/SuperButton'

import w from './ModalBasic.module.css'

type ModalBasicType = {
  modalName: string
  deleteSave: boolean
  handleState: boolean
  children: React.ReactNode
  handleClose: () => void
  handleModalFn: () => void
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#ffffff',
  border: '2.5px solid #ebebec',
  boxShadow: 24,
  p: 0,
}

export const ModalBasic = ({
  modalName,
  deleteSave,
  handleState,
  children,
  handleClose,
  handleModalFn,
}: ModalBasicType) => {
  return (
    <div>
      <Modal
        open={handleState}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ border: 'none', borderBottom: '1px solid #d3d3d3' }}>
            <Box
              sx={{
                paddingLeft: 4,
                paddingRight: 4,
                paddingTop: 2,
                paddingBottom: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span className={w.modalName}>{modalName}</span>
              <SuperButton className={w.closeButton} onClick={handleClose}>
                <CloseIcon className={w.closeIcon} fill="red" />
              </SuperButton>
            </Box>
          </Box>
          <Box
            sx={{
              paddingLeft: 4,
              paddingRight: 4,
              paddingTop: 2,
              paddingBottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {children}
          </Box>
          <Box sx={{ p: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <SuperButton className={w.button + ' ' + w.buttonCancel} onClick={handleClose}>
              Cancel
            </SuperButton>
            {deleteSave ? (
              <SuperButton className={w.button + ' ' + w.buttonDelete} onClick={handleModalFn}>
                Delete
              </SuperButton>
            ) : (
              <SuperButton className={w.button + ' ' + w.buttonSave} onClick={handleModalFn}>
                Save
              </SuperButton>
            )}
          </Box>
        </Box>
      </Modal>
    </div>
  )
}
