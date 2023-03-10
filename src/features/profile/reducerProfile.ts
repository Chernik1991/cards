import { Dispatch } from 'redux'

import { setAppStatusAC } from 'app/app-reducer'
import { errorUtils } from 'common/utils/error-utils'
import { authAPI, ResponseLoginType } from 'features/auth/auth-api'

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
      const userData = { ...action.payload.data }

      return { ...userData }
    }
    case 'changeUserName': {
      const newName = action.payload.name1

      return { ...state, name: newName }
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

export const updateUserDataTC = (name: string, avatar?: string) => async (dispatch: Dispatch) => {
  try {
    const res = await authAPI.updateUser({ name, avatar })

    dispatch(setAppStatusAC('loading'))
    console.log(res, 'res')
    if (res.request.status === 200) {
      dispatch(setAppStatusAC('succeeded'))
      dispatch(setNewNameAC(name))
    } else {
      dispatch(setAppStatusAC('failed'))
    }
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
