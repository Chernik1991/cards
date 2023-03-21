import { instance } from '../auth/auth-api'

export const learnAPI = {
  setGradeCard(data: setGradeCardDataType) {
    return instance.put<setGradeCardDataType>('cards/grade', data)
  },
}

export type setGradeCardDataType = {
  grade: number
  card_id: string
}

export type setGradeCardResponsType = {
  _id: string
  cardsPack_id: string
  card_id: string
  user_id: string
  grade: number
  shots: number
}
