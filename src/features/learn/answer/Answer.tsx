import { Button } from '@mui/material'

import s from 'features/learn/answer/Answer.module.css'
import { Grades } from 'features/learn/answer/Grades'
import { useAppSelector } from 'store/store'

export const Answer = () => {
  const onNextHandler = () => {
    console.log(111)
  }
  const finalAnswer = useAppSelector(state => state.packs.minCardsCount)

  return (
    <div className={s.answer}>
      <span>
        <b>Answer: </b> {finalAnswer}
      </span>
      <Grades />
      <Button variant="contained" onClick={onNextHandler}>
        Next
      </Button>
    </div>
  )
}
