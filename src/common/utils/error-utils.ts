import axios, { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { setAppErrorAC, SetAppErrorActionType } from 'app/app-reducer'

export const errorUtils = (e: any, dispatch: Dispatch<SetAppErrorActionType>) => {
  const err = e as Error | AxiosError<{ error: string }>

  if (axios.isAxiosError(err)) {
    const error = err.response?.data ? err.response.data.error : err.message

    dispatch(setAppErrorAC(error))
  } else {
    dispatch(setAppErrorAC(`Native error ${err.message}`))
  }
}
