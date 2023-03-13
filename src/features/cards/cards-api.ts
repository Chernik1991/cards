import axios, { AxiosResponse } from 'axios'

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
  // 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const cardsAPI = {
  getCards(data: GetCardsParamsType) {
    return instance.get<GetCardsParamsType, AxiosResponse<ResponseGetCardsType>>('/cards/card', {
      params: { ...data },
    })
  },
  setCards(data: SetCardParamsType) {
    return instance.post<SetCardParamsType, AxiosResponse<ResponseSetCardType>>('/cards/card', data)
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

export type GetCardsParamsType = {
  cardAnswer?: string
  cardQuestion?: string
  cardsPack_id: string
  min?: number
  max?: number
  sortCards?: string
  page?: number
  pageCount?: string
}
export type SetCardParamsType = {
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

export type ResponseGetCardsType = {
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
