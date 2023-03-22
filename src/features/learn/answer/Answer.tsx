import { Button } from '@mui/material'

import s from 'features/learn/answer/Answer.module.css'
import { Grades } from 'features/learn/answer/Grades'
import { useAppDispatch, useAppSelector } from 'store/store'
import { changeGradeTC } from '../learnReducer'

export const Answer = () => {
  const dispatch = useAppDispatch()
  const onNextHandler = () => {
    /* dispatch(changeGradeTC())*/
    console.log(114)
  }
  const Answer = useAppSelector(state => state.learn.currentCard.answer)

  return (
    <div className={s.answer}>
      <span>
        <b>Answer: </b> {Answer}
      </span>
      <Grades />
      <Button variant="contained" onClick={onNextHandler}>
        Next
      </Button>
    </div>
  )
}
