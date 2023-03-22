import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import o from './EditCardModal.module.css'

import SuperInputText from 'common/components/c1-SuperInputText/SuperInputText'
import SuperSelect from 'common/components/c5-SuperSelect/SuperSelect'

type EditCardType = {
  errorAnswer: boolean
  errorQuestion: boolean
  valueAnswer: string
  valueQuestion: string
}

export const EditCard = ({ errorAnswer, errorQuestion, valueAnswer, valueQuestion }: EditCardType) => {
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
          value={valueQuestion}
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
          value={valueAnswer}
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
