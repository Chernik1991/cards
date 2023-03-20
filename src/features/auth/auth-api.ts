import axios, { AxiosResponse } from 'axios'

export const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
  // 'https://neko-back.herokuapp.com/2.0/',
  withCredentials: true,
})

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<LoginParamsType, AxiosResponse<ResponseLoginType>>('auth/login', data)
  },
  register(data: RegisterParamsType) {
    return instance.post<RegisterParamsType, AxiosResponse<ResponseRegisterType>>('/auth/register', data)
  },
  me() {
    return instance.post<{}, AxiosResponse<ResponseLoginType>>('auth/me', {})
  },
  updateUser(data: ProfileParamsType) {
    return instance.put<ProfileType, AxiosResponse<ResponseUpdatedUserType>>('/auth/me', data)
  },
  logOut() {
    return instance.delete<{}, AxiosResponse<ResponseInfoType>>('auth/me')
  },
  forgot(data: ForgotParamsType) {
    return instance.post<ForgotParamsType, AxiosResponse<ResponseInfoType>>('/auth/forgot', data)
  },
  setNewPassword(data: SetNewPasswordParamsType) {
    return instance.post<SetNewPasswordParamsType, AxiosResponse<ResponseInfoType>>('/auth/set-new-password', data)
  },
}

export type LoginParamsType = {
  email: string
  password: string
  rememberMe?: boolean
}
export type RegisterParamsType = {
  email: string
  password: string
}
export type ProfileParamsType = {
  name: string
  avatar?: string
}
export type ForgotParamsType = {
  email: string
  from: string
  message: string
}
export type SetNewPasswordParamsType = {
  password: string
  resetPasswordToken: string
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
