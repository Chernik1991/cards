const initialState: learnStateType = {
  isShowAnswer: false,
}

export const learnReducer = (state: learnStateType = initialState, action: ActionsType): learnStateType => {
  switch (action.type) {
    case 'SET-SHOW-ANSWER': {
      return { ...state, isShowAnswer: action.isShowAnswer }
    }

    default:
      return state
  }
}

export const setShowAnswerAC = (isShowAnswer: boolean) => ({ type: 'SET-SHOW-ANSWER', isShowAnswer } as const)

export type learnStateType = {
  isShowAnswer: boolean
}

type ActionsType = setShowAnswerType

export type setShowAnswerType = ReturnType<typeof setShowAnswerAC>
