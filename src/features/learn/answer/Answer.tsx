import { Button } from '@mui/material'

import { changeGradeTC, setCurrentCardAC } from '../learnReducer'
import { randomCard } from '../randomCard'

import { CardsType } from 'features/cards/cards-api'
import * as cardsSelectors from 'features/cards/selectorCard'
import s from 'features/learn/answer/Answer.module.css'
import { Grades } from 'features/learn/answer/Grades'
import * as learnSelectors from 'features/learn/selectorLearn'
import { useAppDispatch, useAppSelector } from 'store/store'

export const Answer = () => {
  const cards = useAppSelector<Array<CardsType>>(cardsSelectors.cards)
  const answer = useAppSelector(learnSelectors.answer)
  const dispatch = useAppDispatch()
  const onNextHandler = () => {
    dispatch(changeGradeTC())
    dispatch(setCurrentCardAC(randomCard(cards)))
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
