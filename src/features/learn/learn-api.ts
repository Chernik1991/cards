import { AxiosResponse } from 'axios'

import { instance } from 'features/auth/auth-api'

export const learnApi = {
  setGradeCard(data: setGradeCardDataType) {
    return instance.put<setGradeCardDataType, AxiosResponse<setGradeCardResponseType>>('/cards/grade', data)
  },
}

export type setGradeCardDataType = {
  grade: number
  card_id: string
}

export type setGradeCardResponseType = {
  updatedGrade: {
    card_id: string
    cardsPack_id: string
    created: string
    grade: number
    more_id: string
    shots: number
    updated: string
    user_id: string
    __v: number
    _id: string
  }
}
