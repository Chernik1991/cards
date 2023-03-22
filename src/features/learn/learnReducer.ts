import { CardsType } from '../cards/cards-api'
import { AppThunkType } from '../../store/store'
import { setAppStatusAC } from '../../app/app-reducer'
import { errorUtils } from '../../common/utils/error-utils'
import { learnAPI, setGradeCardDataType } from './learnAPI'
import { learnLogic } from './learnLogic'
import { setCardsDataAC } from '../cards/card/card-reducer'

const initialState: learnStateType = {
  isShowAnswer: false,
  grade: 0,
  currentCard: {} as CardsType,
}

export const changeGradeTC = (): AppThunkType => async (dispatch, getState) => {
  const gregerg = getState().learn.currentCard
  // console.log(2, card_id, grade, cards)
  console.log(gregerg)

  dispatch(setAppStatusAC('loading'))
  try {
    // const data: setGradeCardDataType = { card_id, grade }
    // console.log(data)

    // const res = await learnAPI.setGradeCard(data)

    // dispatch(
    //   setCardsDataAC(
    //     cards.map(el =>
    //       el._id === res.data.cardsPack_id ? { ...el, grade: res.data.grade, shots: res.data.shots } : el
    //     )
    //   )
    // )

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
  currentCard: any
}

type ActionsType = setShowAnswerType | setGradeType | setCurrentCardType

export type setShowAnswerType = ReturnType<typeof setShowAnswerAC>
export type setGradeType = ReturnType<typeof setGradeAC>
export type setCurrentCardType = ReturnType<typeof setCurrentCardAC>
