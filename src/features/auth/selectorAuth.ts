import { AppStateType } from 'store/store'

export const isLoggedIn = (state: AppStateType) => state.auth.isLoggedIn
export const isRegister = (state: AppStateType) => state.reg.isRegister
export const forgotPassword = (state: AppStateType) => state.forgot.forgotPassword
export const isSetNewPassword = (state: AppStateType) => state.pass.isSetNewPassword
export const email = (state: AppStateType) => state.forgot.email
