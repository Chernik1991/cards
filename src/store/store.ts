import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AnyAction, applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { appReducer } from 'app/app-reducer'
import { setNewPasswordReducer } from 'features/auth/forgotPassword/createNewPassword/newPassword-reducer'
import { forgotReducer } from 'features/auth/forgotPassword/forgotPassword/forgotPassword-reducer'
import { authReducer } from 'features/auth/login/auth-reducer'
import { registerReducer } from 'features/auth/register/register-reducer'
import { cardsReducer } from 'features/cards/card/card-reducer'
import { cardModalsReducer } from 'features/cards/cardModals/cardModalsReducer'
import { learnReducer } from 'features/learn/learnReducer'
import { modalsReducer } from 'features/packs/modals/modalsReducer'
import { packsReducer } from 'features/packs/packsReducer'
import { profileReducer } from 'features/profile/reducerProfile'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  profile: profileReducer,
  reg: registerReducer,
  pass: setNewPasswordReducer,
  forgot: forgotReducer,
  packs: packsReducer,
  cards: cardsReducer,
  learn: learnReducer,
  packsAdditionalSettings: modalsReducer,
  cardsAdditionalSettings: cardModalsReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export const useAppDispatch = () => useDispatch<AppThunk>()
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector

//Types
export type AppStateType = ReturnType<typeof rootReducer>
export type AppThunk = ThunkDispatch<AppStateType, any, AnyAction>
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, AnyAction>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore.
window.store = store
