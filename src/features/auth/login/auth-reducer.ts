import { authAPI, LoginParamsType } from 'api/cards-api'
import { setAppIsInitializedAC, setAppStatusAC } from 'app/app-reducer'
import { AppThunkType } from 'app/store'
import { errorUtils } from 'common/utils/error-utils'
import { setUserDataAC } from 'features/profile/reducerProfile'

const initialState: InitialStateType = {
  isLoggedIn: false,
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.value }
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
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await authAPI.login(data)

      console.log(res.data, 'loginTC')
      if (res.data.name.length > 0) {
        console.log(res.data.name.length)
        dispatch(setIsLoggedInAC(true))
        dispatch(setUserDataAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        // handleServerAppError(res.data, dispatch)
      }
    } catch (e: any) {
      errorUtils(e, dispatch)
      dispatch(setAppStatusAC('failed'))
      //   handleServerNetworkError({message:'1'},dispatch)
    }
  }
export const initializeAppTC = (): AppThunkType => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  try {
    const res = await authAPI.me()

    if (res.request.status === 200) {
      dispatch(setIsLoggedInAC(true))
      dispatch(setUserDataAC(res.data))
      dispatch(setAppStatusAC('succeeded'))
    } else {
      // handleServerAppError(res.data, dispatch)
    }
  } catch (e: any) {
    errorUtils(e, dispatch)
    dispatch(setAppStatusAC('failed'))
    //   handleServerNetworkError({message:'1'},dispatch)
  } finally {
    dispatch(setAppIsInitializedAC(true))
  }
}
export const logoutTC = (): AppThunkType => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  try {
    const res = await authAPI.logOut()

    console.log(res, 'logoutTC')

    if (res.data.info.length > 0) {
      dispatch(setIsLoggedInAC(false))
      dispatch(setAppStatusAC('succeeded'))
      // dispatch(clearTodoDataAC())
    } else {
      // handleServerAppError(res.data, dispatch)
    }
  } catch (e: any) {
    errorUtils(e, dispatch)
    dispatch(setAppStatusAC('failed'))
  }
  // handleServerNetworkError({message:'1'},dispatch)
}

//types
type ActionsType = ReturnType<typeof setIsLoggedInAC>
type InitialStateType = { isLoggedIn: boolean }
