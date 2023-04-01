import * as React from 'react'

import { Button } from '@mui/material'

import { defaultCover } from 'common/constans/constans'
import { setShowAnswerAC } from 'features/learn/learnReducer'
import s from 'features/learn/question/Question.module.css'
import * as learnSelectors from 'features/learn/selectorLearn'
import o from 'features/modals/EditCard/EditCardModal.module.css'
import y from 'features/profile/Profile.module.css'
import { useAppDispatch, useAppSelector } from 'store/store'

export const Question = () => {
  const shots = useAppSelector(learnSelectors.shots)
  const question = useAppSelector(learnSelectors.question)
  const questionImg = useAppSelector(learnSelectors.questionImg)

  const isShowAnswer = useAppSelector(learnSelectors.isShowAnswer)
  const dispatch = useAppDispatch()

  const onClickHandler = () => {
    dispatch(setShowAnswerAC(true))
  }

  return (
    <div className={s.questionContainer}>
      <div className={s.question}>
        <span>{'Question: ' + `"${question}"`}</span>
        <div className={o.selectCover}>
          {questionImg ? <img src={questionImg ? questionImg : defaultCover} className={y.deckCover} alt="ava" /> : ''}
        </div>
      </div>
      <span className={s.numberOfAnswers}>
        <span>{'Number of answers to the question: ' + `"${shots}"`}</span>
      </span>
      {!isShowAnswer && (
        <Button variant="contained" onClick={onClickHandler}>
          Show answer
        </Button>
      )}
    </div>
  )
}
