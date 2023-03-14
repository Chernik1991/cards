import { setAppStatusAC } from 'app/app-reducer'
import { AppThunkType } from 'app/store'
import { errorUtils } from 'common/utils/error-utils'
import { authAPI, RegisterParamsType } from 'features/auth/auth-api'

const initialState: InitialStateType = {
  isRegister: false,
}

export const registerReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  console.log('registerReducer')
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

      console.log(res, 'res')

      dispatch(setAppStatusAC('loading'))

      if (res.data.addedUser._id) {
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setIsRegisterAC(true))
      } else {
        dispatch(setAppStatusAC('failed'))
      }
    } catch (e: any) {
      // const err = e as Error | AxiosError<{ error: string }>

      errorUtils(e, dispatch)

      dispatch(setAppStatusAC('failed'))
    }
  }

type ActionsType = ReturnType<typeof setIsRegisterAC>
type InitialStateType = {
  isRegister: boolean
}
