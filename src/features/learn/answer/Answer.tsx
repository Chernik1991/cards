import { Button } from '@mui/material'

import { changeGradeTC, setCurrentCardAC } from '../learnReducer'
import { randomCard } from '../randomCard'

import s from 'features/learn/answer/Answer.module.css'
import { Grades } from 'features/learn/answer/Grades'
import { useAppDispatch, useAppSelector } from 'store/store'

export const Answer = () => {
  const cards = useAppSelector(state => state.cards.cards)
  const dispatch = useAppDispatch()
  const onNextHandler = () => {
    dispatch(changeGradeTC())
    dispatch(setCurrentCardAC(randomCard(cards)))
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
