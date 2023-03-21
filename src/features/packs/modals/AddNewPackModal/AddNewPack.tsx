import { ReactNode } from 'react'

import SuperInputText from 'common/components/c1-SuperInputText/SuperInputText'
import SuperCheckbox from 'common/components/c3-SuperCheckbox/SuperCheckbox'
import o from 'features/packs/modals/AddNewPackModal/AddNewPackModal.module.css'

type AddNewPackType = {
  error?: ReactNode
}

export const AddNewPack = ({ error }: AddNewPackType) => {
  return (
    <div className={o.modalWrapper}>
      <span className={o.inputLabel}>Name pack</span>
      <SuperInputText className={o.modalInput} id="AddNewPackInput" error={error} />
      <div className={o.modalCheckboxContainer}>
        <SuperCheckbox className={o.modalCheckbox} id="AddNewPackCheckbox">
          Private pack
        </SuperCheckbox>
      </div>
    </div>
  )
}
