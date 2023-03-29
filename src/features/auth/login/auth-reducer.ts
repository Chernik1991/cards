import { setAppIsInitializedAC, setAppStatusAC } from 'app/app-reducer'
import { errorUtils } from 'common/utils/error-utils'
import { authAPI, LoginParamsType } from 'features/auth/auth-api'
import { setUserDataAC } from 'features/profile/reducerProfile'
import { AppThunkType } from 'store/store'

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
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await authAPI.login(data)

      dispatch(setIsLoggedInAC(true))
      dispatch(setUserDataAC(res.data))
      dispatch(setAppStatusAC('succeeded'))
    } catch (e: any) {
      errorUtils(e, dispatch)
      dispatch(setAppStatusAC('failed'))
    }
  }
export const initializeAppTC = (): AppThunkType => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  try {
    const res = await authAPI.me()

    dispatch(setIsLoggedInAC(true))
    dispatch(setUserDataAC(res.data))
    dispatch(setAppStatusAC('succeeded'))
  } catch (e) {
    dispatch(setAppStatusAC('failed'))
  } finally {
    dispatch(setAppIsInitializedAC(true))
  }
}
export const logoutTC = (): AppThunkType => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  try {
    await authAPI.logOut()

    dispatch(setIsLoggedInAC(false))
    dispatch(setAppStatusAC('succeeded'))
  } catch (e: any) {
    errorUtils(e, dispatch)
    dispatch(setAppStatusAC('failed'))
  }
}

//types
type ActionsType = ReturnType<typeof setIsLoggedInAC>
type InitialStateType = { isLoggedIn: boolean }
