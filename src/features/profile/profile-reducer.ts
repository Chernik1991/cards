const initialState: InitialStateType = {
  data: '1231323213213',
}

//reducer
export const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'PROFILE/SET-DATA':
      return { ...state, data: action.data }
    case 'CLEAR-DATA':
      return { ...state, data: {} }
    default:
      return { ...state }
  }
}

//AC
export const clearTodoDataAC = () => ({ type: 'CLEAR-DATA' } as const)
export const setProfileData = (data: any) => ({ type: 'PROFILE/SET-DATA', data } as const)

//types
type ActionsType = setProfileDataActionType | clearProfileDataActionType
export type clearProfileDataActionType = ReturnType<typeof clearTodoDataAC>
export type setProfileDataActionType = ReturnType<typeof setProfileData>
export type InitialStateType = { data: any }
