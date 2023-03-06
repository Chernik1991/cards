import { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { cardsAPI, RegisterParamsType } from '../../../api/cards-api'
import { setAppStatusAC } from '../../../app/app-reducer'
import { errorUtils } from '../../../common/utils/error-utils'

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

export const registerTC = (data: RegisterParamsType) => async (dispatch: Dispatch) => {
  try {
    const res = await cardsAPI.registerUser(data)

    dispatch(setAppStatusAC('loading'))

    if (res.data.addedUser._id) {
      console.log('good')
      console.log(res.data.addedUser._id)
      dispatch(setAppStatusAC('succeeded'))
      dispatch(setIsRegisterAC(true))
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

type ActionsType = ReturnType<typeof setIsRegisterAC>
type InitialStateType = {
  isRegister: boolean
}
