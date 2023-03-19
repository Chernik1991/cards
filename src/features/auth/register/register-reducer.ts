import { setAppStatusAC } from 'app/app-reducer'
import { errorUtils } from 'common/utils/error-utils'
import { authAPI, RegisterParamsType } from 'features/auth/auth-api'
import { AppThunkType } from 'store/store'

const initialState: InitialStateType = {
  isRegister: false,
}

export const registerReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'register/SIGN-UP':
      return { ...state, isRegister: action.value }
    default:
      return state
  }
}

export const setIsRegisterAC = (value: boolean) => ({ type: 'register/SIGN-UP', value } as const)

export const registerTC =
  (data: RegisterParamsType): AppThunkType =>
  async dispatch => {
    console.log('registerTC')
    try {
      const res = await authAPI.register(data)

      dispatch(setAppStatusAC('loading'))
      dispatch(setAppStatusAC('succeeded'))
      dispatch(setIsRegisterAC(true))
    } catch (e: any) {
      errorUtils(e, dispatch)

      dispatch(setAppStatusAC('failed'))
    }
  }

type ActionsType = ReturnType<typeof setIsRegisterAC>
type InitialStateType = {
  isRegister: boolean
}
