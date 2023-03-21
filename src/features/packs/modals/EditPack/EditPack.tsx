import { ReactNode } from 'react'

import o from './EditPack.module.css'

import SuperInputText from 'common/components/c1-SuperInputText/SuperInputText'
import SuperCheckbox from 'common/components/c3-SuperCheckbox/SuperCheckbox'

type EditPackType = {
  error?: ReactNode
  packStatus?: boolean
  packName?: string
}

export const EditPack = ({ error, packStatus, packName }: EditPackType) => {
  return (
    <div className={o.modalWrapper}>
      <span className={o.inputLabel}>Name pack</span>
      <SuperInputText className={o.modalInput} value={packName} id="userEditNickName" error={error} />
      <div className={o.modalCheckboxContainer}>
        <SuperCheckbox className={o.modalCheckbox} checked={packStatus} id="EditPackCheckbox">
          Private pack
        </SuperCheckbox>
      </div>
    </div>
  )
}
