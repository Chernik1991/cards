import * as React from 'react'
import { useEffect, useState } from 'react'

import { Paper } from '@mui/material'
import { Navigate, NavLink } from 'react-router-dom'

import { BackToCardsButton } from 'common/constans/BackToCardsButton'
import * as authSelectors from 'features/auth/selectorAuth'
import { GetCardsTC } from 'features/cards/cards-reducer'
import * as cardsSelectors from 'features/cards/selectorCard'
import { Answer } from 'features/learn/answer/Answer'
import s from 'features/learn/Learn.module.css'
import { setCurrentCardAC } from 'features/learn/learnReducer'
import { Question } from 'features/learn/question/Question'
import { randomCard } from 'features/learn/randomCard'
import * as learnSelectors from 'features/learn/selectorLearn'
import { clearPacksDataAC } from 'features/packs/packsReducer'
import y from 'features/profile/Profile.module.css'
import { PATH } from 'routes/pages'
import { useAppDispatch, useAppSelector } from 'store/store'

export const Learn = () => {
  const cards = useAppSelector(cardsSelectors.cards)
  const packName = useAppSelector(cardsSelectors.packName)
  const cardsLength = useAppSelector(cardsSelectors.cardsLength)
  const isShowAnswer = useAppSelector(learnSelectors.isShowAnswer)
  const cardsPack_id = useAppSelector(cardsSelectors.cardsPack_id)
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(authSelectors.isLoggedIn)
  const [first, setFirst] = useState<boolean>(true)

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} replace />
  }
  useEffect(() => {
    if (first) {
      dispatch(GetCardsTC())
      setFirst(false)
    }
    if (cards.length > 0) {
      dispatch(setCurrentCardAC(randomCard(cards)))
    }
  }, [cardsPack_id, cards])

  const packsListHandler = () => {
    dispatch(clearPacksDataAC())
  }

  return (
    <div>
      <NavLink className={y.backContainer} to={PATH.CARD} onClick={packsListHandler}>
        <BackToCardsButton />
      </NavLink>
      <div className={s.learnContainer}>
        <span className={s.title}> {'Learn ' + `"${packName}"`}</span>
        {cardsLength > 0 ? (
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
