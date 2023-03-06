import axios, { AxiosResponse } from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  withCredentials: true,
})

export const cardsAPI = {
  registerUser(data: RegisterParamsType) {
    return instance.post<RegisterParamsType, AxiosResponse<any>>('/auth/register', data)
  },
}

export type RegisterParamsType = {
  email: string
  password: string
}
