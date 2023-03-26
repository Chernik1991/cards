import { AppStateType } from 'store/store'

export const isShowAnswer = (state: AppStateType) => state.learn.isShowAnswer
export const cardsPack_id = (state: AppStateType) => state.packsAdditionalSettings.cardsPack._id
export const question = (state: AppStateType) => state.learn.currentCard.question
export const answer = (state: AppStateType) => state.learn.currentCard.answer
export const shots = (state: AppStateType) => state.learn.currentCard.shots
