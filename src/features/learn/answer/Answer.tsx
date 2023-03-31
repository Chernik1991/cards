import { Button } from '@mui/material'

import { changeGradeTC } from '../learnReducer'

import s from 'features/learn/answer/Answer.module.css'
import { Grades } from 'features/learn/answer/Grades'
import * as learnSelectors from 'features/learn/selectorLearn'
import { useAppDispatch, useAppSelector } from 'store/store'

export const Answer = () => {
  const answer = useAppSelector(learnSelectors.answer)
  const dispatch = useAppDispatch()
  const onNextHandler = () => {
    dispatch(changeGradeTC())
  }

  return (
    <div className={s.answer}>
      <span>
        <b>Answer: </b> {answer}
      </span>
      <Grades />
      <Button variant="contained" onClick={onNextHandler}>
        Next
      </Button>
    </div>
  )
}
