import axios, { AxiosResponse } from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  withCredentials: true,
})

export const authAPI = {
  // logOut(){
  //   return instance.delete<ResponseType>('auth/login');
  // },
  // login(data:LoginParamsType){
  //   return instance.post<LoginParamsType, AxiosResponse<ResponseType<{ userId: number }>>>('auth/login', data);
  // },
  login(data: LoginParamsType) {
    return instance.post<LoginParamsType, AxiosResponse<ResponseType>>('auth/login', data)
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
