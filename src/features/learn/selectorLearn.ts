import { AppStateType } from 'store/store'

export const isShowAnswer = (state: AppStateType) => state.learn.isShowAnswer
export const question = (state: AppStateType) => state.learn.currentCard.question
export const answer = (state: AppStateType) => state.learn.currentCard.answer
export const shots = (state: AppStateType) => state.learn.currentCard.shots
export const questionImg = (state: AppStateType) => state.learn.currentCard.questionImg
export const answerImg = (state: AppStateType) => state.learn.currentCard.answerImg
