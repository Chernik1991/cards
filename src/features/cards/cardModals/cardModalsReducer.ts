type CardModalType = {
  card: {
    _id: string
    question: string
    answer: string
    questionImg?: string
    answerImg?: string
    questionVideo?: string
    answerVideo?: string
  }
}

const initialState: CardModalType = {
  card: {
    _id: '',
    question: '',
    answer: '',
  },
}

export const cardModalsReducer = (state: CardModalType = initialState, action: ActionsType): CardModalType => {
  switch (action.type) {
    case 'CARDS/UPDATE-CARD-ID': {
      const newState = { ...state }

      newState.card._id = action.payload.data

      return { ...state, ...newState }
    }
    case 'CARDS/ADD-NEW-CARD-ANSWER': {
      const newState = { ...state }

      newState.card.answer = action.payload.data

      return { ...state, ...newState }
    }
    case 'CARDS/ADD-NEW-CARD-QUESTION': {
      const newState = { ...state }

      newState.card.question = action.payload.data

      return { ...state, ...newState }
    }

    case 'CARDS/CLEAR-STATE': {
      const newState = { ...state }

      newState.card = {
        _id: '',
        question: '',
        answer: '',
      }

      return { ...state, ...newState }
    }
    default:
      return state
  }
}

type ActionsType = updateUserCardIDType | updateUserCardAnswerType | addNewUserCardQuestionType | clearUserCardStateType

export type addNewUserCardQuestionType = ReturnType<typeof addNewUseCardQuestionAC>
export type updateUserCardIDType = ReturnType<typeof updateUserCardIDAC>
export type updateUserCardAnswerType = ReturnType<typeof addNewUseCardAnswerAC>
export type clearUserCardStateType = ReturnType<typeof clearUserStateCardAC>

export const addNewUseCardQuestionAC = (data: string) =>
  ({ type: 'CARDS/ADD-NEW-CARD-QUESTION', payload: { data } } as const)
export const addNewUseCardAnswerAC = (data: string) =>
  ({ type: 'CARDS/ADD-NEW-CARD-ANSWER', payload: { data } } as const)
export const updateUserCardIDAC = (data: string) => ({ type: 'CARDS/UPDATE-CARD-ID', payload: { data } } as const)

export const clearUserStateCardAC = () => ({ type: 'CARDS/CLEAR-STATE' } as const)
