import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import o from './AddCardModal.module.css'

import SuperInputText from 'common/components/c1-SuperInputText/SuperInputText'
import SuperSelect from 'common/components/c5-SuperSelect/SuperSelect'

type AddNewCardType = {
  errorAnswer: boolean
  errorQuestion: boolean
}

export const AddNewCard = ({ errorAnswer, errorQuestion }: AddNewCardType) => {
  return (
    <div className={o.modalWrapper}>
      <span className={o.selectLabel}>Choose a question format</span>
      <SuperSelect
        className={o.selectStyle}
        options={[
          { value: 'Text', id: crypto.randomUUID() },
          { value: 'Picture', id: crypto.randomUUID() },
        ]}
      />
      <KeyboardArrowDownIcon className={o.selectArrow} />
      <div className={o.modalInputWrapper}>
        <span className={o.selectQuestion}>Question</span>
        <SuperInputText
          className={o.modalInput}
          id="CardQuestion"
          error={
            errorQuestion ? (
              <span style={{ fontSize: '10px', position: 'relative', top: '55px' }}>Question required</span>
            ) : (
              ''
            )
          }
        />
        <span className={o.selectQuestion}>Answer</span>
        <SuperInputText
          className={o.modalInput}
          id="CardAnswer"
          error={
            errorAnswer ? (
              <span style={{ fontSize: '10px', position: 'relative', top: '55px' }}>Answer required</span>
            ) : (
              ''
            )
          }
        />
      </div>
    </div>
  )
}
