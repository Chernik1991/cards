import * as React from 'react'

import { Button } from '@mui/material'

import { defaultCover } from 'common/constans/constans'
import s from 'features/learn/answer/Answer.module.css'
import { Grades } from 'features/learn/answer/Grades'
import { changeGradeTC } from 'features/learn/learnReducer'
import * as learnSelectors from 'features/learn/selectorLearn'
import o from 'features/modals/EditCard/EditCardModal.module.css'
import y from 'features/profile/Profile.module.css'
import { useAppDispatch, useAppSelector } from 'store/store'

export const Answer = () => {
  const answer = useAppSelector(learnSelectors.answer)
  const answerImg = useAppSelector(learnSelectors.answerImg)
  const dispatch = useAppDispatch()
  const onNextHandler = () => {
    dispatch(changeGradeTC())
  }

  return (
    <div className={s.answer}>
      <span>
        <b>Answer: </b> {answer}
        <div className={o.selectCover}>
          {answerImg ? <img src={answerImg ? answerImg : defaultCover} className={y.deckCover} alt="ava" /> : ''}
        </div>
      </span>
      <Grades />
      <Button variant="contained" onClick={onNextHandler}>
        Next
      </Button>
    </div>
  )
}
