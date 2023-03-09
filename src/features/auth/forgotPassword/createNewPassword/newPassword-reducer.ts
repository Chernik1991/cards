import { AxiosError } from 'axios'

import { authAPI, SetNewPasswordParamsType } from 'api/cards-api'
import { setAppStatusAC } from 'app/app-reducer'
import { AppThunkType } from 'app/store'
import { errorUtils } from 'common/utils/error-utils'

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

export const setIsSetNewPasswordAC = (value: boolean) => ({ type: 'Set-New-Password', value } as const)

export const setNewPasswordTC =
  (data: SetNewPasswordParamsType): AppThunkType =>
  async dispatch => {
    try {
      const res = await authAPI.setNewPassword(data)

      dispatch(setAppStatusAC('loading'))

      if (res.data.info === 'setNewPassword success —ฅ/ᐠ.̫ .ᐟฅ—') {
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
