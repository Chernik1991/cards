import { ReactNode } from 'react'

import SuperInputText from 'common/components/c1-SuperInputText/SuperInputText'
import SuperCheckbox from 'common/components/c3-SuperCheckbox/SuperCheckbox'
import { setPackNameAC, setPrivatePackAC } from 'features/cards/cards-reducer'
import o from 'features/packs/modals/EditPack/EditPack.module.css'
import { useAppDispatch } from 'store/store'

type props = {
  id: string
  error?: ReactNode
  packStatus?: boolean
  packName?: string
}

export const EditPack = ({ error, packStatus, packName, id }: props) => {
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

  return (
    <div className={o.modalWrapper}>
      <span className={o.inputLabel}>Name pack</span>
      <SuperInputText className={o.modalInput} value={packName} error={error} onChangeText={onChangeText} />
      <div className={o.modalCheckboxContainer}>
        <SuperCheckbox className={o.modalCheckbox} checked={packStatus} onChangeChecked={onChangeChecked}>
          Private pack
        </SuperCheckbox>
      </div>
    </div>
  )
}
