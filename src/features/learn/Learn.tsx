import { Paper } from '@mui/material'
import { NavLink } from 'react-router-dom'

import { Answer } from 'features/learn/answer/Answer'
import s from 'features/learn/Learn.module.css'
import { Question } from 'features/learn/question/Question'
import y from 'features/profile/Profile.module.css'
import { PATH } from 'routes/pages'
import { useAppSelector } from 'store/store'

export const Learn = () => {
  const packName = useAppSelector(state => state.cards.packName)

  const isShowAnswer = useAppSelector(state => state.learn.isShowAnswer)

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
        <Paper>
          <Question />
          {isShowAnswer && <Answer />}
        </Paper>
      </div>
    </div>
  )
}