import { AxiosError } from 'axios'

import { authAPI, ForgotParamsType } from 'api/cards-api'
import { setAppStatusAC } from 'app/app-reducer'
import { AppThunkType } from 'app/store'
import { errorUtils } from 'common/utils/error-utils'

const initialState: InitialStateType = {
  forgotPassword: false,
}

export const forgotReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'forgotPass':
      return { ...state, forgotPassword: action.payload.value }
    default:
      return state
  }
}

export const setForgotAC = (value: boolean) => ({ type: 'forgotPass', payload: { value } } as const)

export const setForgotTC =
  (data: ForgotParamsType): AppThunkType =>
  async dispatch => {
    try {
      const res = await authAPI.forgot(data)

      dispatch(setAppStatusAC('loading'))

      // if (res.data.info === 'setNewPassword success —ฅ/ᐠ.̫ .ᐟฅ—') {
      if (res.data.info === 'success —ฅ/ᐠ.̫ .ᐟฅ—') {
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

type ActionsType = ReturnType<typeof setForgotAC>
type InitialStateType = {
  forgotPassword: boolean
}
