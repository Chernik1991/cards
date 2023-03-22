import { AxiosResponse } from 'axios'

import { instance } from 'features/auth/auth-api'

export const learnAPI = {
  setGradeCard(data: setGradeCardDataType) {
    return instance.put<setGradeCardDataType, AxiosResponse<setGradeCardResponseType>>('cards/grade', { data })
  },
}

export type setGradeCardDataType = {
  grade: number
  card_id: string
}

export type setGradeCardResponseType = {
  _id: string
  cardsPack_id: string
  card_id: string
  user_id: string
  grade: number
  shots: number
}
