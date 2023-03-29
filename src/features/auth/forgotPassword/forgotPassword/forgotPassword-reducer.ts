import { AxiosError } from 'axios'

import { setAppStatusAC } from 'app/app-reducer'
import { errorUtils } from 'common/utils/error-utils'
import { authAPI, ForgotParamsType } from 'features/auth/auth-api'
import { AppThunkType } from 'store/store'

const initialState: InitialStateType = {
  forgotPassword: false,
  email: '',
}

export const forgotReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'forgotPass':
      return { ...state, forgotPassword: action.payload.value }
    case 'setForgotEmail':
      return { ...state, email: action.payload.email }
    default:
      return state
  }
}

export const setForgotAC = (value: boolean) => ({ type: 'forgotPass', payload: { value } } as const)
export const setForgotEmailAC = (email: string) => ({ type: 'setForgotEmail', payload: { email } } as const)

export const setForgotTC =
  (data: ForgotParamsType): AppThunkType =>
  async dispatch => {
    try {
      const res = await authAPI.forgot(data)

      console.log(res.data)
      dispatch(setAppStatusAC('loading'))
      dispatch(setForgotEmailAC(data.email))
      dispatch(setAppStatusAC('succeeded'))
      dispatch(setForgotAC(true))
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)

      dispatch(setAppStatusAC('failed'))
    }
  }

type ActionsType = ReturnType<typeof setForgotAC> | ReturnType<typeof setForgotEmailAC>
type InitialStateType = {
  forgotPassword: boolean
  email: string
}
