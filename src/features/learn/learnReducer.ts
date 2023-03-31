import { CardsType } from '../cards/cards-api'

import { setAppStatusAC } from 'app/app-reducer'
import { errorUtils } from 'common/utils/error-utils'
import { setCardLearnAC } from 'features/cards/cards-reducer'
import { learnApi } from 'features/learn/learn-api'
import { AppThunkType } from 'store/store'

const initialState: learnStateType = {
  isShowAnswer: false,
  grade: 1,
  currentCard: {} as CardsType,
}

export const changeGradeTC = (): AppThunkType => async (dispatch, getState) => {
  const card_id = getState().learn.currentCard._id
  const grade = getState().learn.grade
  const cards = getState().cards.cards

  dispatch(setAppStatusAC('loading'))
  try {
    const res = await learnApi.setGradeCard({ card_id, grade: grade })

    console.log(res)
    dispatch(
      setCardLearnAC(
        cards.map(el =>
          el._id === res.data.updatedGrade.card_id
            ? { ...el, grade: res.data.updatedGrade.grade, shots: res.data.updatedGrade.shots }
            : el
        )
      )
    )
    console.log(cards, 'cards')
    dispatch(setShowAnswerAC(false))
    dispatch(setAppStatusAC('succeeded'))
  } catch (e: any) {
    errorUtils(e, dispatch)
    dispatch(setAppStatusAC('failed'))
  }
}

export const learnReducer = (state: learnStateType = initialState, action: ActionsType): learnStateType => {
  switch (action.type) {
    case 'SET-SHOW-ANSWER': {
      return { ...state, isShowAnswer: action.isShowAnswer }
    }
    case 'SET-GRADE': {
      return { ...state, grade: action.grade }
    }
    case 'SET-CURRENT-CARD': {
      return { ...state, currentCard: action.currentCard }
    }

    default:
      return state
  }
}

export const setShowAnswerAC = (isShowAnswer: boolean) => ({ type: 'SET-SHOW-ANSWER', isShowAnswer } as const)
export const setGradeAC = (grade: number) => ({ type: 'SET-GRADE', grade } as const)
export const setCurrentCardAC = (currentCard: CardsType) => ({ type: 'SET-CURRENT-CARD', currentCard } as const)

export type learnStateType = {
  isShowAnswer: boolean
  grade: number
  currentCard: CardsType
}

type ActionsType = setShowAnswerType | setGradeType | setCurrentCardType

export type setShowAnswerType = ReturnType<typeof setShowAnswerAC>
export type setGradeType = ReturnType<typeof setGradeAC>
export type setCurrentCardType = ReturnType<typeof setCurrentCardAC>
