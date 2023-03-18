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
  email: 'iofefje@gmail.com',
  name: 'Alen Del',
  avatar: '',
  publicCardPacksCount: 0,

  created: 'Date',
  updated: 'Date',
  isAdmin: false,
  rememberMe: false,

  error: '',

  editedMode: false,
  currentName: '',
}

export const profileReducer = (state: ResponseLoginType = initialState, action: ActionsType): ResponseLoginType => {
  switch (action.type) {
    case 'addUserdata': {
      return { ...state, ...action.payload.data }
    }
    case 'changeUserName': {
      return { ...state, name: action.payload.name1 }
    }
    case 'changeCurrentName':
      return { ...state, currentName: action.payload.name2 }
    case 'editMode':
      return { ...state, editedMode: action.payload.editedMode }
    default:
      return state
  }
}

export const setUserDataAC = (data: ResponseLoginType) => ({ type: 'addUserdata', payload: { data } } as const)
export const setNewNameAC = (name1: string) => ({ type: 'changeUserName', payload: { name1 } } as const)
export const setNewCurrnetNameAC = (name2: string) => ({ type: 'changeCurrentName', payload: { name2 } } as const)
export const editedModeAC = (editedMode: boolean) => ({ type: 'editMode', payload: { editedMode } } as const)

export const updateUserDataTC =
  (name: string, avatar?: string): AppThunkType =>
  async dispatch => {
    try {
      const res = await authAPI.updateUser({ name, avatar })

      dispatch(setAppStatusAC('loading'))

      dispatch(setAppStatusAC('succeeded'))
      dispatch(setNewNameAC(name))
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
