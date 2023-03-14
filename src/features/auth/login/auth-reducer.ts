import { setAppIsInitializedAC, setAppStatusAC } from 'app/app-reducer'
import { AppThunkType } from 'app/store'
import { errorUtils } from 'common/utils/error-utils'
import { authAPI, LoginParamsType } from 'features/auth/auth-api'
import { setUserDataAC } from 'features/profile/reducerProfile'

const initialState: InitialStateType = {
  isLoggedIn: false,
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'LOGIN/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.value }
    default:
      return state
  }
}

//action
export const setIsLoggedInAC = (value: boolean) => ({ type: 'LOGIN/SET-IS-LOGGED-IN', value } as const)
//thunks
export const loginTC =
  (data: LoginParamsType): AppThunkType =>
  async dispatch => {
    console.log('loginTC')
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await authAPI.login(data)

      if (res.status === 200) {
        dispatch(setIsLoggedInAC(true))
        dispatch(setUserDataAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        dispatch(setAppStatusAC('failed'))
      }
    } catch (e: any) {
      errorUtils(e, dispatch)
      dispatch(setAppStatusAC('failed'))
    }
  }
export const initializeAppTC = (): AppThunkType => async dispatch => {
  console.log(2, 'initializeAppTC')
  dispatch(setAppStatusAC('loading'))
  try {
    const res = await authAPI.me()

    if (res.request.status === 200) {
      dispatch(setIsLoggedInAC(true))
      dispatch(setUserDataAC(res.data))
      dispatch(setAppStatusAC('succeeded'))
    } else {
      dispatch(setAppStatusAC('failed'))
    }
  } catch (e) {
    dispatch(setAppStatusAC('failed'))
  } finally {
    dispatch(setAppIsInitializedAC(true))
  }
}
export const logoutTC = (): AppThunkType => async dispatch => {
  console.log('logoutTC')
  dispatch(setAppStatusAC('loading'))
  try {
    const res = await authAPI.logOut()

    if (res.status === 200) {
      dispatch(setIsLoggedInAC(false))
      dispatch(setAppStatusAC('succeeded'))
    } else {
      dispatch(setAppStatusAC('failed'))
    }
  } catch (e: any) {
    errorUtils(e, dispatch)
    dispatch(setAppStatusAC('failed'))
  }
}

//types
type ActionsType = ReturnType<typeof setIsLoggedInAC>
type InitialStateType = { isLoggedIn: boolean }
