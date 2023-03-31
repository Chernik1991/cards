import * as React from 'react'
import { ChangeEvent, ReactNode, useState } from 'react'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import SuperInputText from 'common/components/c1-SuperInputText/SuperInputText'
import SuperSelect from 'common/components/c5-SuperSelect/SuperSelect'
import { InputTypeFileIcon } from 'common/components/inputTypeFile/InputTypeFileIcon'
import { cardAnswerAC, cardQuestionAC } from 'features/cards/cards-reducer'
import o from 'features/modals/EditCard/EditCardModal.module.css'
import y from 'features/profile/Profile.module.css'
import { useAppDispatch } from 'store/store'

type EditCardType = {
  errorAnswer: ReactNode
  errorQuestion: ReactNode
  valueAnswer: string
  valueQuestion: string
  valueQuestionImg: string
  valueAnswerImg: string
  setQuestionImage: (image: string) => void
  setAnswerImage: (image: string) => void
}

export const EditCard = ({
  errorAnswer,
  errorQuestion,
  valueAnswer,
  valueQuestion,
  valueQuestionImg,
  valueAnswerImg,
  setQuestionImage,
  setAnswerImage,
}: EditCardType) => {
  const [format, setFormat] = useState('Text')
  const dispatch = useAppDispatch()
  const onChangeQuestion = (value: string) => {
    dispatch(cardQuestionAC(value))
  }

  const onChangeAnswer = (value: string) => {
    dispatch(cardAnswerAC(value))
  }
  const onChangePicture = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormat(e.target.value)
  }

  return (
    <div className={o.modalWrapper}>
      <span className={o.selectLabel}>Choose a question format</span>
      <SuperSelect
        className={o.selectStyle}
        options={[
          { value: 'Text', id: 'Text' },
          { value: 'Picture', id: 'Picture' },
        ]}
        onChange={onChangePicture}
      />
      <KeyboardArrowDownIcon className={o.selectArrow} />
      <div className={o.modalInputWrapper}>
        <span className={o.selectQuestion}>Question</span>
        {format === 'Text' ? (
          <SuperInputText
            value={valueQuestion}
            className={o.modalInput}
            onChangeText={onChangeQuestion}
            error={errorQuestion}
          />
        ) : (
          <div className={o.selectQuestionCover}>
            <img src={valueQuestionImg} className={y.userPhoto} alt="ava" />
            <InputTypeFileIcon icon={false} setImage={setQuestionImage} />
          </div>
        )}
        <span className={o.selectQuestion}>Answer</span>
        {format === 'Text' ? (
          <SuperInputText
            className={o.modalInput}
            value={valueAnswer}
            onChangeText={onChangeAnswer}
            error={errorAnswer}
          />
        ) : (
          <div className={o.selectQuestionCover}>
            <img src={valueAnswerImg} className={y.userPhoto} alt="ava" />
            <InputTypeFileIcon icon={false} setImage={setAnswerImage} />
          </div>
        )}
      </div>
    </div>
  )
}
