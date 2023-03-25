import { setCardLearnAC } from '../cards/card/card-reducer'
import { CardsType } from '../cards/cards-api'

import { learnAPI } from './learnAPI'

import { setAppStatusAC } from 'app/app-reducer'
import { errorUtils } from 'common/utils/error-utils'
import { AppThunkType } from 'store/store'

const initialState: learnStateType = {
  isShowAnswer: false,
  grade: 5,
  currentCard: {} as CardsType,
}

export const changeGradeTC = (): AppThunkType => async (dispatch, getState) => {
  const card_id = getState().learn.currentCard._id
  const grade = getState().learn.grade
  const cards = getState().cards.cards

  dispatch(setAppStatusAC('loading'))
  try {
    // const data: setGradeCardDataType = { card_id, grade }
    const res = await learnAPI.setGradeCard({ card_id, grade: grade })

    dispatch(
      setCardLearnAC(
        cards.map(el =>
          el._id === res.data.updatedGrade._id
            ? { ...el, grade: res.data.updatedGrade.grade, shots: res.data.updatedGrade.shots }
            : el
        )
      )
    )
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
export const setCurrentCardAC = (currentCard: any) => ({ type: 'SET-CURRENT-CARD', currentCard } as const)

export type learnStateType = {
  isShowAnswer: boolean
  grade: number
  currentCard: any
}

type ActionsType = setShowAnswerType | setGradeType | setCurrentCardType

export type setShowAnswerType = ReturnType<typeof setShowAnswerAC>
export type setGradeType = ReturnType<typeof setGradeAC>
export type setCurrentCardType = ReturnType<typeof setCurrentCardAC>
