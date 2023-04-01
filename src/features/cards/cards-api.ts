import { AxiosResponse } from 'axios'

import { instance } from 'features/auth/auth-api'

export const cardsAPI = {
  getCards(params: GetCardsParamsType) {
    return instance.get<GetCardsParamsType, AxiosResponse<ResponseGetCardsType>>('/cards/card', {
      params,
    })
  },
  setCards(data: SetCardType) {
    return instance.post<SetCardParamsType, AxiosResponse<ResponseSetCardType>>('/cards/card', { card: { ...data } })
  },
  delCards(params: string) {
    return instance.delete<DeleteCardsParamsType, AxiosResponse<ResponseDeleteCardsType>>('/cards/card', {
      params,
    })
  },
  updateCards(data: UpdateParamsType) {
    return instance.put<UpdateCardParamsType, AxiosResponse<ResponseUpdateCardType>>('/cards/card', {
      card: { ...data },
    })
  },
}

export type GetCardsParamsType = {
  cardAnswer?: string
  cardQuestion: string
  cardsPack_id: string
  min?: number
  max?: number
  sortCards?: string
  page?: number
  pageCount?: number
}
export type SetCardParamsType = {
  card: SetCardType
}
export type SetCardType = {
  cardsPack_id: string
  question: string
  answer: string
  grade?: number
  shots?: number
  answerImg?: string
  questionImg?: string
  questionVideo?: string
  answerVideo?: string
}
export type DeleteCardsParamsType = {
  id: string
}
export type DeleteCardsType = {
  id: string
  cardsPack_id: string
}
export type UpdateCardParamsType = {
  card: UpdateParamsType
}
export type UpdateParamsType = {
  _id: string
  question: string
  answer: string
  answerImg: string
  questionImg: string
}
export type CardsType = {
  _id: string
  cardsPack_id: string
  user_id: string
  answer: string
  question: string
  grade: number
  shots: number
  comments: string
  type: string
  rating: number
  more_id: string
  created: string
  updated: string
  __v: number
  answerImg: string
  questionImg: string
}

export type ResponseGetCardsType = {
  cards: CardsType[]
  packDeckCover: string
  packUserId: string
  maxCardsCount: number
  minCardsCount: number
  packName: string
  packPrivate: boolean
  packCreated: string
  packUpdated: string
  page: number
  pageCount: number
  cardsTotalCount: number
  minGrade: number
  maxGrade: number
  token: string
  tokenDeathTime: number
  cardsPack_id: string
  cardQuestion: string
  cardAnswer: string
  cardQuestionImg: string
  cardAnswerImg: string
  sortCards: string
  card_id: string
  search: string
}
export type ResponseSetCardType = {
  newCard: CardsType
  token: string
  tokenDeathTime: number
}
export type ResponseDeleteCardsType = {
  deletedCard: CardsType
  token: string
  tokenDeathTime: number
}
export type ResponseUpdateCardType = {
  updatedCard: CardsType
  token: string
  tokenDeathTime: number
}
