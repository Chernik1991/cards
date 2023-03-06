import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AnyAction, applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk'

import { registerReducer } from '../features/auth/a2-register/register-reducer'

import { appReducer } from 'app/app-reducer'

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния.
const rootReducer = combineReducers({
  app: appReducer,
  reg: registerReducer,
})

// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
// создаем тип диспатча который принимает как AC так и TC
export type AppThunk = ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppThunk>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore.
window.store = store
