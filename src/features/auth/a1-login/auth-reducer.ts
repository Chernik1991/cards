import { authAPI, LoginParamsType } from 'api/cards-api'
import { setAppIsInitializedAC, setAppStatusAC } from 'app/app-reducer'
import { AppThunkType } from 'app/store'
import { errorUtils } from 'common/utils/error-utils'
import { setProfileData } from 'features/profile/profile-reducer'

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
        dispatch(setAppStatusAC('succeeded'))
      } else {
        // handleServerAppError(res.data, dispatch)
      }
    } catch (e: any) {
      errorUtils(e, dispatch)
      //   handleServerNetworkError({message:'1'},dispatch)
    }
  }
export const initializeAppTC = (): AppThunkType => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  try {
    const res = await authAPI.me()

    console.log(res, 'initializeAppTC')
    if (res.request.status === 200) {
      dispatch(setIsLoggedInAC(true))
      dispatch(setProfileData(res.data))
      dispatch(setAppStatusAC('succeeded'))
    } else {
      // handleServerAppError(res.data, dispatch)
    }
  } catch (e: any) {
    errorUtils(e, dispatch)
    //   handleServerNetworkError({message:'1'},dispatch)
  } finally {
    dispatch(setAppIsInitializedAC(true))
  }
}
//types
type ActionsType = ReturnType<typeof setIsLoggedInAC>
type InitialStateType = { isLoggedIn: boolean }
