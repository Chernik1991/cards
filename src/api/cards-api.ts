import axios, { AxiosResponse } from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  withCredentials: true,
})

export const authAPI = {
  logOut() {
    return instance.delete<{}, AxiosResponse<ResponseLogOut>>('auth/me')
  },
  login(data: LoginParamsType) {
    return instance.post<LoginParamsType, AxiosResponse<ResponseType>>('auth/login', data)
export const cardsAPI = {
  registerUser(data: RegisterParamsType) {
    return instance.post<RegisterParamsType, AxiosResponse<any>>('/auth/register', data)
  },
  me() {
    return instance.post<{}, AxiosResponse<ResponseType>>('auth/me', {})
  },
}
export type LoginParamsType = {
  email: string
  password: string
  rememberMe?: boolean
}
export type ResponseType = {
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
}
export type ResponseLogOut = {
  info: string
  error: string
}
}

export type RegisterParamsType = {
  email: string
  password: string
}
