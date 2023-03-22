import { Button } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../../store/store'
import { setShowAnswerAC } from '../learnReducer'

import s from './Question.module.css'

export const Question = () => {
  const { question, shots } = useAppSelector(state => state.learn.currentCard)
  const isShowAnswer = useAppSelector(state => state.learn.isShowAnswer)
  const dispatch = useAppDispatch()

  const onClickHandler = () => {
    dispatch(setShowAnswerAC(true))
  }

  return (
    <div className={s.questionContainer}>
      <div className={s.question}>
        <span>{'Question: ' + `"${question}"`}</span>
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
