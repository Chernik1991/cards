import { AxiosError } from 'axios'

import { authAPI, ForgotParamsType } from 'api/cards-api'
import { setAppStatusAC } from 'app/app-reducer'
import { AppThunkType } from 'app/store'
import { errorUtils } from 'common/utils/error-utils'

export const setForgotTC =
  (data: ForgotParamsType): AppThunkType =>
  async dispatch => {
    try {
      const res = await authAPI.forgot(data)

      dispatch(setAppStatusAC('loading'))

      if (res.data.info === 'setNewPassword success —ฅ/ᐠ.̫ .ᐟฅ—') {
        dispatch(setAppStatusAC('succeeded'))
      } else {
        dispatch(setAppStatusAC('failed'))
      }
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)

      dispatch(setAppStatusAC('failed'))
    }
  }
