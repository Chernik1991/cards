import s from './Answer.module.css'
import { useAppSelector } from '../../../store/store'
import { Grades } from './Grades'
import { Button } from '@mui/material'

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
