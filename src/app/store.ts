import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AnyAction, applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { profileReducer } from '../features/profile/reducerProfile'

import { appReducer } from './app-reducer'

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния.
const rootReducer = combineReducers({
  app: appReducer,
  profile: profileReducer,
})

// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
// определить автоматически тип всего объекта состояния
export const useAppDispatch = () => useDispatch<AppThunk>()
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector
//Types

export type AppStateType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkDispatch<AppStateType, any, AnyAction>
export type AppThunkDispatch = ThunkDispatch<AppStateType, unknown, AnyAction>
export type AppThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  AppStateType,
  unknown,
  AnyAction
>
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore.
window.store = store
