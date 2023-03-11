import axios, { AxiosResponse } from 'axios'

const instance = axios.create({
  // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  baseURL:
    // process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const cardsAPI = {
  readCards(data: ReadCardsParamsType) {
    return instance.get<ReadCardsParamsType, AxiosResponse<ResponseReadCardsType>>('/cards/card', {
      params: { ...data },
    })
  },
  createCards(data: CreateCardParamsType) {
    return instance.post<CreateCardParamsType, AxiosResponse<ResponseCreateCardType>>('/cards/card', data)
  },
  delCards(data: DeleteCardsParamsType) {
    return instance.delete<DeleteCardsParamsType, AxiosResponse<ResponseDeleteCardsType>>('/cards/card', {
      params: { ...data },
    })
  },
  updateCards(data: UpdateCardParamsType) {
    return instance.put<UpdateCardParamsType, AxiosResponse<ResponseUpdateCardType>>('/cards/card', data)
  },
}

export type ReadCardsParamsType = {
  cardAnswer?: string
  cardQuestion?: string
  cardsPack_id: string
  min?: number
  max?: number
  sortCards?: string
  page?: number
  pageCount?: string
}
export type CreateCardParamsType = {
  card: {
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
}
export type DeleteCardsParamsType = {
  id: string
}
export type UpdateCardParamsType = {
  card: {
    _id: string
    question?: string
  }
}
export type CardsType = {
  _id: string
  cardsPack_id: string
  user_id: string
  question: string
  answer: string
  grade: number
  shots: number
  comments: string
  type: string
  rating: number
  more_id: string
  created: string
  updated: string
  __v: number
}

export type ResponseReadCardsType = {
  cards: CardsType[]
  packUserId: string

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
}
export type ResponseCreateCardType = {
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
