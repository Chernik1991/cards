const initialState: InitialStateType = {
  data: '1231323213213',
}

//reducer
export const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'PROFILE/SET-DATA':
      return { ...state, data: action.data }
    default:
      return { ...state }
  }
}

//AC
export const setProfileData = (data: any) => ({ type: 'PROFILE/SET-DATA', data } as const)

//types

export type setProfileDataActionType = ReturnType<typeof setProfileData>
type ActionsType = setProfileDataActionType
export type InitialStateType = { data: any }
