import { AppStateType } from 'store/store'

export const appIsInitialized = (state: AppStateType) => state.app.isInitialized
export const appStatus = (state: AppStateType) => state.app.status
