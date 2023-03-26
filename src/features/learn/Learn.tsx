import { useEffect, useState } from 'react'

import { Paper } from '@mui/material'
import { NavLink } from 'react-router-dom'

import { GetCardsTC } from 'features/cards/cards-reducer'
import * as cardsSelectors from 'features/cards/selectorCard'
import { Answer } from 'features/learn/answer/Answer'
import s from 'features/learn/Learn.module.css'
import { setCurrentCardAC } from 'features/learn/learnReducer'
import { Question } from 'features/learn/question/Question'
import { randomCard } from 'features/learn/randomCard'
import * as learnSelectors from 'features/learn/selectorLearn'
import y from 'features/profile/Profile.module.css'
import { PATH } from 'routes/pages'
import { useAppDispatch, useAppSelector } from 'store/store'

export const Learn = () => {
  const cards = useAppSelector(cardsSelectors.cards)
  const packName = useAppSelector(cardsSelectors.packName)
  const isShowAnswer = useAppSelector(learnSelectors.isShowAnswer)
  const cardsPack_id = useAppSelector(learnSelectors.cardsPack_id)
  const [first, setFirst] = useState<boolean>(true)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(GetCardsTC())
    setFirst(false)
    if (cards.length > 0) {
      dispatch(setCurrentCardAC(randomCard(cards)))
    }
  }, [cardsPack_id])

  return (
    <div>
      <NavLink className={y.backContainer} to={PATH.PACKS}>
        <svg className={y.backArrow} viewBox="0 0 512 512">
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z" />
        </svg>
        <span> Back to Packs List</span>
      </NavLink>
      <div className={s.learnContainer}>
        <span className={s.title}> {'Learn ' + `"${packName}"`}</span>
        {cards.length > 0 ? (
          <Paper>
            <Question />
            {isShowAnswer && <Answer />}
          </Paper>
        ) : (
          'No Question'
        )}
      </div>
    </div>
  )
}
