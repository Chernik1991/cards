import * as React from 'react'
import { ReactNode } from 'react'

import SuperInputText from 'common/components/c1-SuperInputText/SuperInputText'
import SuperCheckbox from 'common/components/c3-SuperCheckbox/SuperCheckbox'
import { InputTypeFileIcon } from 'common/components/inputTypeFile/InputTypeFileIcon'
import { defaultCover } from 'common/constans/constans'
import { setPackNameAC, setPrivatePackAC } from 'features/cards/cards-reducer'
import o from 'features/modals/EditPack/EditPack.module.css'
import { setDeskCoverAC } from 'features/packs/packsReducer'
import y from 'features/profile/Profile.module.css'
import { useAppDispatch } from 'store/store'

type props = {
  id: string
  error: ReactNode
  packStatus: boolean
  packName: string
  deskCover: string
}

export const EditPack = ({ error, packStatus, packName, id, deskCover }: props) => {
  const dispatch = useAppDispatch()
  const onChangeChecked = (checked: boolean) => {
    dispatch(setPrivatePackAC(checked))
  }
  const onChangeText = (value: string) => {
    if ('add-pack' === id) {
      dispatch(setPackNameAC(value))
    }
    if ('edit-pack' === id) {
      dispatch(setPackNameAC(value))
    }
  }
  const setDeckCover = (image: string) => {
    console.log(image, 'image')
    dispatch(setDeskCoverAC(image))
  }

  return (
    <div className={o.modalWrapper}>
      <span className={o.inputLabel}>Name pack</span>
      <SuperInputText className={o.modalInput} value={packName} error={error} onChangeText={onChangeText} />
      <div className={o.selectQuestionCover}>
        <img src={deskCover} className={y.userPhoto} alt="ava" />
        <span>{'File must be less than 100 kb'}</span>
        <InputTypeFileIcon icon={false} setImage={setDeckCover} defaultImage={defaultCover} image={deskCover} />
      </div>
      <div className={o.modalCheckboxContainer}>
        <SuperCheckbox className={o.modalCheckbox} checked={packStatus} onChangeChecked={onChangeChecked}>
          Private pack
        </SuperCheckbox>
      </div>
    </div>
  )
}
