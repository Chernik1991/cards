import axios, { AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || "http://localhost:7542/2.0/",
  withCredentials: true,
});

export const authAPI = {
  // logOut(){
  //   return instance.delete<ResponseType>('auth/login');
  // },
  // login(data:LoginParamsType){
  //   return instance.post<LoginParamsType, AxiosResponse<ResponseType<{ userId: number }>>>('auth/login', data);
  // },
  login(data: LoginParamsType) {
    return instance.post<LoginParamsType, AxiosResponse<any>>("auth/login", data);
  },
  // me(){
  //   return instance.get<ResponseType<UserType>>('auth/me');
  // }
};
export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe?: boolean;
};
