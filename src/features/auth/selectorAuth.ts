import { AppStateType } from 'store/store'

// export const pageCard = (state: AppStateType) => state.cards.page
// export const cards = (state: AppStateType) => state.cards.cards
// export const packUserId = (state: AppStateType) => state.cards.packUserId
// export const cardsTotalCount = (state: AppStateType) => state.cards.cardsTotalCount
// export const cardsPageCount = (state: AppStateType) => state.cards.pageCount

export const isLoggedInAuth = (state: AppStateType) => state.auth.isLoggedIn
export const isRegisterAuth = (state: AppStateType) => state.reg.isRegister
export const forgotPasswordAuth = (state: AppStateType) => state.forgot.forgotPassword
export const isSetNewPasswordAuth = (state: AppStateType) => state.pass.isSetNewPassword
export const emailAuth = (state: AppStateType) => state.forgot.email
