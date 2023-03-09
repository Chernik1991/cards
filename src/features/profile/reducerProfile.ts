import { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { authAPI, cardsAPI, ResponseLoginType } from 'api/cards-api'
import { setAppStatusAC } from 'app/app-reducer'
import { AppThunkType } from 'app/store'
import { errorUtils } from 'common/utils/error-utils'

const initialState: InitialStateType = {
  __v: 0,
  error: '',
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
  // editedMode: false,
  // currentName: '',
  // tempName: '',
}

export const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'addUserdata': {
      const userData = { ...action.payload.data }

      // return { ...userData }
      return state
    }
    case 'userLogOut': {
      return { ...state, _id: action.payload.userID }
    }
    case 'changeUserName': {
      // const oldState = { ...state }
      const newName = action.payload.name1

      return { ...state, name: newName }
    }
    // case 'changeCurrentName':
    //   return { ...state, currentName: action.payload.name2 }
    // case 'changeTempName':
    //   return { ...state, tempName: action.payload.name3 }
    // case 'editMode':
    //   return { ...state, editedMode: action.payload.editedMode }
    default:
      return state
  }
}

export const setUserDataAC = (data: ResponseLoginType) => ({ type: 'addUserdata', payload: { data } } as const)
export const userLogOutAC = (userID: string) => ({ type: 'userLogOut', payload: { userID } } as const)
export const setNewNameAC = (name1: string) => ({ type: 'changeUserName', payload: { name1 } } as const)
export const setNewCurrnetNameAC = (name2: string) => ({ type: 'changeCurrentName', payload: { name2 } } as const)
export const setTempNameAC = (name3: string) => ({ type: 'changeTempName', payload: { name3 } } as const)
export const editedModeAC = (editedMode: boolean) => ({ type: 'editMode', payload: { editedMode } } as const)

export const addUserDataTC = (): AppThunkType => async dispatch => {
  try {
    const res = await authAPI.me()

    dispatch(setAppStatusAC('loading'))

    if (res.data._id) {
      console.log('good')
      console.log(res.data._id)
      dispatch(setAppStatusAC('succeeded'))
      dispatch(setUserDataAC(res.data))
    } else {
      dispatch(setAppStatusAC('failed'))
      console.log('Error1')
    }
  } catch (e: any) {
    errorUtils(e, dispatch)
  }
}

export const updateUserDataTC = (data: ResponseLoginType) => async (dispatch: Dispatch) => {
  try {
    const res = await cardsAPI.updateUserData(data)

    dispatch(setAppStatusAC('loading'))

    if (res.data._id) {
      console.log('good')
      console.log(res.data._id)
      dispatch(setAppStatusAC('succeeded'))
      dispatch(setNewNameAC(data.name))
    } else {
      dispatch(setAppStatusAC('failed'))
      console.log('Error1')
    }
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>

    dispatch(setAppStatusAC('failed'))
    errorUtils(err, dispatch)
    console.log('Error2')
  }
}

export const userLogOutTC = () => async (dispatch: Dispatch) => {
  try {
    const res = await authAPI.logOut()

    dispatch(setAppStatusAC('loading'))

    if (res.data.info) {
      console.log(res.data.info)
      dispatch(setAppStatusAC('succeeded'))
      dispatch(userLogOutAC(''))
    } else {
      dispatch(setAppStatusAC('failed'))
      console.log('Error1')
    }
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>

    dispatch(setAppStatusAC('failed'))
    errorUtils(err, dispatch)
    console.log('Error2')
  }
}

type ActionsType =
  | ReturnType<typeof setNewNameAC>
  | ReturnType<typeof editedModeAC>
  | ReturnType<typeof setNewCurrnetNameAC>
  | ReturnType<typeof setTempNameAC>
  | ReturnType<typeof setUserDataAC>
  | ReturnType<typeof userLogOutAC>
type InitialStateType = ResponseLoginType

// editedMode: boolean
// currentName?: string
// tempName?: string
