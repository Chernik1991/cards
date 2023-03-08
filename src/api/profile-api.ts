import axios, { AxiosResponse } from 'axios'

const instance = axios.create({
  // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:7542/2.0'
      : 'https://neko-back.herokuapp.com/2.0',
  withCredentials: true,
})

export const cardsAPI = {
  authMe() {
    return instance.post<ProfileType, AxiosResponse<any>>('/auth/me', {})
  },
  updateUserData(data: ProfileType) {
    return instance.put<ProfileType, AxiosResponse<any>>('/auth/me', data)
  },
  userLogOut() {
    return instance.delete<ProfileType, AxiosResponse<any>>('/auth/me', {})
  },
}

export type ProfileType = {
  name: string
  avatar?: string
}
