import { AppStateType } from 'store/store'

export const page = (state: AppStateType) => state.cards.page
export const cards = (state: AppStateType) => state.cards.cards
export const cardsPack_id = (state: AppStateType) => state.cards.cardsPack_id
export const packUserId = (state: AppStateType) => state.cards.packUserId
export const packName = (state: AppStateType) => state.cards.packName
export const packPrivate = (state: AppStateType) => state.cards.packPrivate
export const cardsTotalCount = (state: AppStateType) => state.cards.cardsTotalCount
export const cardQuestion = (state: AppStateType) => state.cards.cardQuestion
export const cardAnswer = (state: AppStateType) => state.cards.cardAnswer
export const cardQuestionImg = (state: AppStateType) => state.cards.cardQuestionImg
export const cardAnswerImg = (state: AppStateType) => state.cards.cardAnswerImg
export const pageCount = (state: AppStateType) => state.cards.pageCount
export const sortCards = (state: AppStateType) => state.cards.sortCards
export const minCardsCount = (state: AppStateType) => state.cards.minCardsCount
export const maxCardsCount = (state: AppStateType) => state.cards.maxCardsCount
export const cardsLength = (state: AppStateType) => state.cards.cards.length
export const card_id = (state: AppStateType) => state.cards.card_id
export const search = (state: AppStateType) => state.cards.search
export const packDeckCover = (state: AppStateType) => state.cards.packDeckCover
