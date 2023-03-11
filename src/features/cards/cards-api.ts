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
    return instance.get<ReadCardsParamsType, AxiosResponse<ResponseReadCards>>('/cards/card', { params: { ...data } })
  },
  createCards(data: CreateCardParamsType) {
    return instance.post<CreateCardParamsType, AxiosResponse<any>>('/cards/card', data)
  },
  delCards(data: DelCardsParamsType) {
    return instance.post<DelCardsParamsType, AxiosResponse<any>>('/cards/card', { params: { ...data } })
  },
  updateCards(data: UpdateCardParamsType) {
    return instance.post<UpdateCardParamsType, AxiosResponse<any>>('/cards/card', data)
  },
  // login(data: LoginParamsType) {
  //   return instance.post<LoginParamsType, AxiosResponse<ResponseLoginType>>('auth/login', data)
  // },
  // register(data: RegisterParamsType) {
  //   return instance.post<RegisterParamsType, AxiosResponse<ResponseRegisterType>>('/auth/register', data)
  // },
  // me() {
  //   return instance.post<{}, AxiosResponse<ResponseLoginType>>('auth/me', {})
  // },
  // updateUser(data: ProfileParamsType) {
  //   return instance.put<ProfileType, AxiosResponse<ResponseUpdatedUserType>>('/auth/me', data)
  // },
  // logOut() {
  //   return instance.delete<{}, AxiosResponse<ResponseInfoType>>('auth/me')
  // },
  // forgot(data: ForgotParamsType) {
  //   return instance.post<ForgotParamsType, AxiosResponse<ResponseInfoType>>('/auth/forgot', data)
  // },
  // setNewPassword(data: SetNewPasswordParamsType) {
  //   return instance.post<SetNewPasswordParamsType, AxiosResponse<ResponseInfoType>>('/auth/set-new-password', data)
  // },
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
export type DelCardsParamsType = {
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

export type ResponseReadCards = {
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
export type ResponseLoginType = {
  _id: string
  email: string
  rememberMe: boolean
  isAdmin: boolean
  name: string
  verified: boolean
  publicCardPacksCount: number
  created: string
  updated: string
  __v: number
  token: string
  tokenDeathTime: number
  avatar: string
  error?: string

  editedMode?: boolean
  currentName?: string
  tempName?: string
}
export type ResponseRegisterType = {
  addedUser: any
  error?: string
}
export type ResponseUpdatedUserType = {
  updatedUser: any
  error?: string
}
export type ResponseInfoType = {
  info: string
  error: string
}
export type ProfileType = {
  name: string
  avatar?: string
}
