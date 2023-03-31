import { setAppStatusAC } from 'app/app-reducer'
import { errorUtils } from 'common/utils/error-utils'
import { authAPI, ResponseLoginType } from 'features/auth/auth-api'
import { AppThunkType } from 'store/store'

const initialState: ResponseLoginType = {
  __v: 0,
  token: '',
  tokenDeathTime: 0,
  verified: false,
  _id: '',
  email: '',
  name: '',
  avatar: '',
  publicCardPacksCount: 0,
  created: '',
  updated: '',
  isAdmin: false,
  rememberMe: false,
  error: '',
  editedMode: false,
  currentName: '',
}

export const profileReducer = (state: ResponseLoginType = initialState, action: ActionsType): ResponseLoginType => {
  switch (action.type) {
    case 'addUserdata':
      return { ...state, ...action.payload.data }
    case 'changeUserName':
      return { ...state, name: action.payload.name1 }
    case 'changeCurrentName':
      return { ...state, currentName: action.payload.name2 }
    case 'editMode':
      return { ...state, editedMode: action.payload.editedMode }
    case 'changeAvatar':
      return { ...state, avatar: action.payload.avatar }
    default:
      return state
  }
}

export const setUserDataAC = (data: ResponseLoginType) => ({ type: 'addUserdata', payload: { data } } as const)
export const setNewNameAC = (name1: string) => ({ type: 'changeUserName', payload: { name1 } } as const)
export const setNewAvatarAC = (avatar: string) => ({ type: 'changeAvatar', payload: { avatar } } as const)
export const setNewCurrnetNameAC = (name2: string) => ({ type: 'changeCurrentName', payload: { name2 } } as const)
export const editedModeAC = (editedMode: boolean) => ({ type: 'editMode', payload: { editedMode } } as const)

export const updateUserDataTC = (): AppThunkType => async (dispatch, getState) => {
  const { name, avatar } = getState().profile

  dispatch(setAppStatusAC('loading'))
  try {
    await authAPI.updateUser({ name, avatar })

    dispatch(setAppStatusAC('succeeded'))
    // dispatch(setNewNameAC(name))
    // dispatch(setNewAvatarAC(avatar))
  } catch (e: any) {
    dispatch(setAppStatusAC('failed'))
    errorUtils(e, dispatch)
  }
}

type ActionsType =
  | ReturnType<typeof setNewNameAC>
  | ReturnType<typeof editedModeAC>
  | ReturnType<typeof setNewCurrnetNameAC>
  | ReturnType<typeof setUserDataAC>
  | ReturnType<typeof setNewAvatarAC>
