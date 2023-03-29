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

export const setIsSetNewPasswordAC = (value: boolean) => ({ type: 'Set-New-Password', value } as const)

export const setNewPasswordTC =
  (data: SetNewPasswordParamsType): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      await authAPI.setNewPassword(data)

      dispatch(setAppStatusAC('succeeded'))
      dispatch(setIsSetNewPasswordAC(true))
    } catch (e: any) {
      errorUtils(e, dispatch)
      dispatch(setAppStatusAC('failed'))
    }
  }

type ActionsType = ReturnType<typeof setIsSetNewPasswordAC>
type InitialStateType = {
  isSetNewPassword: boolean
}
