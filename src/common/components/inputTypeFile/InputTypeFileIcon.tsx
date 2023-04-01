import React, { ChangeEvent, useState } from 'react'

import { Button, IconButton } from '@mui/material'

import { UserCameraIcon } from 'common/constans/UserCameraIcon'
import { convertFileToBase64 } from 'common/utils/convertFileToBase64'

type Props = {
  icon: boolean
  setImage: (image: string) => void
  defaultImage: string
  image: string
}
export const InputTypeFileIcon = ({ icon, setImage, defaultImage, image }: Props) => {
  const [ava, setAva] = useState(image)
  const [isAvaBroken, setIsAvaBroken] = useState(false)
  const [isTrue] = useState(false)
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 100000) {
        convertFileToBase64(file, (file64: string) => {
          setAva(file64)
        })
      } else {
        console.error('Error: ', 'Файл слишком большого размера')
      }
    }
  }
  const errorHandler = () => {
    setIsAvaBroken(true)
    alert('Кривая картинка')
    setTimeout(() => setIsAvaBroken(false), 3000)
  }

  if (!isAvaBroken) {
    setImage(ava)
  } else {
    setImage(defaultImage)
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
      <div style={{ display: 'none' }}>
        {!isTrue ? <img src={isAvaBroken ? defaultImage : ava} onError={errorHandler} alt="ava" /> : ''}
      </div>
      <input
        type="file"
        onChange={uploadHandler}
        style={{ display: 'none' }}
        accept="image/png, image/gif, image/jpeg"
      />
    </IconButton>
  )
}
