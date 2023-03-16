import { AxiosError } from 'axios'

import { setAppStatusAC } from 'app/app-reducer'
import { errorUtils } from 'common/utils/error-utils'
import { authAPI, SetNewPasswordParamsType } from 'features/auth/auth-api'
import { AppThunkType } from 'store/store'

const initialState: InitialStateType = {
  isSetNewPassword: false,
}

export const setNewPasswordReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'Set-New-Password':
      return { ...state, isSetNewPassword: action.value }
    default:
      return state
  }
}
const answer = 'setNewPassword success —ฅ/ᐠ.̫ .ᐟฅ—'

export const setIsSetNewPasswordAC = (value: boolean) => ({ type: 'Set-New-Password', value } as const)

export const setNewPasswordTC =
  (data: SetNewPasswordParamsType): AppThunkType =>
  async dispatch => {
    try {
      debugger
      const res = await authAPI.setNewPassword(data)

      dispatch(setAppStatusAC('loading'))

      if (res.data.info === answer) {
        console.log(res.data, 'res.data')
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setIsSetNewPasswordAC(true))
      } else {
        dispatch(setAppStatusAC('failed'))
      }
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)

      dispatch(setAppStatusAC('failed'))
    }
  }

type ActionsType = ReturnType<typeof setIsSetNewPasswordAC>
type InitialStateType = {
  isSetNewPassword: boolean
}
