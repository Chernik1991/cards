import { ReactNode } from 'react'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import SuperInputText from 'common/components/c1-SuperInputText/SuperInputText'
import SuperSelect from 'common/components/c5-SuperSelect/SuperSelect'
import { cardAnswerAC, cardQuestionAC } from 'features/cards/cards-reducer'
import o from 'features/modals/EditCard/EditCardModal.module.css'
import { useAppDispatch } from 'store/store'

type EditCardType = {
  errorAnswer: ReactNode
  errorQuestion: ReactNode
  valueAnswer: string
  valueQuestion: string
}

export const EditCard = ({ errorAnswer, errorQuestion, valueAnswer, valueQuestion }: EditCardType) => {
  const dispatch = useAppDispatch()
  const onChangeQuestion = (value: string) => {
    dispatch(cardQuestionAC(value))
  }

  const onChangeAnswer = (value: string) => {
    dispatch(cardAnswerAC(value))
  }

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
          onChangeText={onChangeQuestion}
          error={errorQuestion}
        />
        <span className={o.selectQuestion}>Answer</span>
        <SuperInputText
          className={o.modalInput}
          value={valueAnswer}
          onChangeText={onChangeAnswer}
          error={errorAnswer}
        />
      </div>
    </div>
  )
}
