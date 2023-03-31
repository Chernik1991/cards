import React, { ChangeEvent } from 'react'

import { Button, IconButton } from '@mui/material'

import { UserCameraIcon } from 'common/constans/UserCameraIcon'
import { convertFileToBase64 } from 'common/utils/convertFileToBase64'

type Props = {
  icon: boolean
  setImage: (image: string) => void
}
export const InputTypeFileIcon = ({ icon, setImage }: Props) => {
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 100000) {
        convertFileToBase64(file, (file64: string) => {
          console.log('file64: ', file64)
          setImage(file64)
        })
      } else {
        console.error('Error: ', 'Файл слишком большого размера')
      }
    }
  }

  return (
    <IconButton component="label">
      {icon ? (
        <UserCameraIcon />
      ) : (
        <Button variant="contained" component="span">
          Change cover
        </Button>
      )}
      <input
        type="file"
        onChange={uploadHandler}
        style={{ display: 'none' }}
        accept="image/png, image/gif, image/jpeg"
      />
    </IconButton>
  )
}
