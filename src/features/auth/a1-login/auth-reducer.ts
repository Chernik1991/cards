import { authAPI, LoginParamsType } from 'api/cards-api'
import { AppThunkType } from 'app/store'
import { errorUtils } from 'common/utils/error-utils'

const initialState: InitialStateType = {
  isLoggedIn: false,
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return { ...state }
    default:
      return state
  }
}

//action
export const setIsLoggedInAC = (value: boolean) => ({ type: 'login/SET-IS-LOGGED-IN', value } as const)
//thunks
export const loginTC =
  (data: LoginParamsType): AppThunkType =>
  async dispatch => {
    // dispatch(setAppStatusAC('loading'))
    try {
      const res = await authAPI.login(data)

      console.log(res)
      // if (res.data.resultCode===0){
      dispatch(setIsLoggedInAC(true))
      //   dispatch(setAppStatusAC('succeeded'))
      //   } else {
      //     handleServerAppError(res.data,dispatch)
      //   }
    } catch (e: any) {
      errorUtils(e, dispatch)
      //   handleServerNetworkError({message:'1'},dispatch)
    }
  }

//types
type ActionsType = ReturnType<typeof setIsLoggedInAC>
type InitialStateType = { isLoggedIn: boolean }
