import { AxiosError } from 'axios'

import { setAppStatusAC } from 'app/app-reducer'
import { AppThunkType } from 'app/store'
import { errorUtils } from 'common/utils/error-utils'
import { authAPI, ForgotParamsType } from 'features/auth/auth-api'

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
const answer = 'sent —ฅ/ᐠ.̫ .ᐟ\\ฅ—'

export const setForgotAC = (value: boolean) => ({ type: 'forgotPass', payload: { value } } as const)
export const setForgotEmailAC = (email: string) => ({ type: 'setForgotEmail', payload: { email } } as const)

export const setForgotTC =
  (data: ForgotParamsType): AppThunkType =>
  async dispatch => {
    debugger
    try {
      const res = await authAPI.forgot(data)

      console.log(res.data)
      dispatch(setAppStatusAC('loading'))
      dispatch(setForgotEmailAC(data.email))
      // if (res.data.info === 'setNewPassword success —ฅ/ᐠ.̫ .ᐟฅ—') {
      if (res.data.info === answer) {
        // console.log(res.data.data.info, 'res.data.info')
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setForgotAC(true))
      } else {
        dispatch(setAppStatusAC('failed'))
      }
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
