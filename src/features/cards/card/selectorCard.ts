import { AppStateType } from 'app/store'

export const pageCard = (state: AppStateType) => state.cards.page
export const cards = (state: AppStateType) => state.cards.cards
export const packUserId = (state: AppStateType) => state.cards.packUserId
export const cardsTotalCount = (state: AppStateType) => state.cards.cardsTotalCount
export const cardsPageCount = (state: AppStateType) => state.cards.pageCount
export const cardsLengthCards = (state: AppStateType) => state.cards.cards.length
