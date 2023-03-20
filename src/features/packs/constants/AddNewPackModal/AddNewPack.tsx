import o from './AddNewPackModal.module.css'

import SuperInputText from 'common/components/c1-SuperInputText/SuperInputText'
import SuperCheckbox from 'common/components/c3-SuperCheckbox/SuperCheckbox'

export const AddNewPack = () => {
  return (
    <div className={o.modalWrapper}>
      <span className={o.inputLabel}>Name pack</span>
      <SuperInputText className={o.modalInput} />
      <div className={o.modalCheckboxContainer}>
        <SuperCheckbox className={o.modalCheckbox}>Private pack</SuperCheckbox>
      </div>
    </div>
  )
}
