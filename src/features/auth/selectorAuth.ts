import { AppStateType } from 'store/store'

export const isLoggedInAuth = (state: AppStateType) => state.auth.isLoggedIn
export const isRegisterAuth = (state: AppStateType) => state.reg.isRegister
export const forgotPasswordAuth = (state: AppStateType) => state.forgot.forgotPassword
export const isSetNewPasswordAuth = (state: AppStateType) => state.pass.isSetNewPassword
export const emailAuth = (state: AppStateType) => state.forgot.email
