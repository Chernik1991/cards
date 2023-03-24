import { AppStateType } from 'store/store'

export const pageCard = (state: AppStateType) => state.cards.page
export const cards = (state: AppStateType) => state.cards.cards
export const packUserId = (state: AppStateType) => state.cards.packUserId
export const packId = (state: AppStateType) => state.cards.setPackId
export const packUserName = (state: AppStateType) => state.cards.packName
export const packUserPrivate = (state: AppStateType) => state.cards.packPrivate
export const cardsTotalCount = (state: AppStateType) => state.cards.cardsTotalCount
export const cardsPageCount = (state: AppStateType) => state.cards.pageCount
export const cardsLengthCards = (state: AppStateType) => state.cards.cards.length
export const cardsAdditionalSettingsQuestion = (state: AppStateType) => state.cardsAdditionalSettings.card.question
export const cardsAdditionalSettingsAnswer = (state: AppStateType) => state.cardsAdditionalSettings.card.answer
export const cardsAdditionalSettingsID = (state: AppStateType) => state.cardsAdditionalSettings.card._id
