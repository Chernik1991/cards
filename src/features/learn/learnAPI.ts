import { instance } from 'features/auth/auth-api'
import { AxiosResponse } from 'axios'

export const learnAPI = {
  setGradeCard(data: setGradeCardDataType) {
    return instance.put<setGradeCardDataType, AxiosResponse<setGradeCardResponseType>>('cards/grade', data)
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
