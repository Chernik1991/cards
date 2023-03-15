import { AxiosError } from 'axios'

import { packsAPI, PacksParamsType, ResponsePacksType, SetNewPackType, UpdatePackType } from './packs-api'

import { setAppStatusAC } from 'app/app-reducer'
import { AppThunkType } from 'app/store'
import { errorUtils } from 'common/utils/error-utils'

const initialState: ResponsePacksType = {
  cardPacks: [
    {
      cardsCount: 0,
      created: 'string',
      deckCover: 'string',
      grade: 0,
      more_id: 'string',
      name: 'string',
      path: 'string',
      private: false,
      rating: 0,
      shots: 0,
      type: 'string',
      updated: 'string',
      user_id: 'string',
      user_name: 'string',
      __v: 'string',
      _id: 'efreg',
    },
  ],
  cardPacksTotalCount: 0,
  // количество колод
  maxCardsCount: 0,
  minCardsCount: 0,
  page: 0, // выбранная страница
  pageCount: 0,
}

export const packsReducer = (state: ResponsePacksType = initialState, action: ActionsType): ResponsePacksType => {
  switch (action.type) {
    case 'getPacks': {
      const packsData = { ...action.payload.data }

      return { ...packsData }
    }
    default:
      return state
  }
}

export const getUserPacksAC = (data: ResponsePacksType) => ({ type: 'getPacks', payload: { data } } as const)

type ActionsType = getUserPacksType
export type getUserPacksType = ReturnType<typeof getUserPacksAC>

export const getPacksTC =
  (data?: PacksParamsType): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC('loading'))
      const res = await packsAPI.getPacks(data)

      dispatch(setAppStatusAC('loading'))
      console.log(res, getPacksTC)

      if (res.request.status === 200) {
        dispatch(setAppStatusAC('succeeded'))
        dispatch(getUserPacksAC(res.data))
      } else {
        dispatch(setAppStatusAC('failed'))
        console.log('Error1')
      }
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      dispatch(setAppStatusAC('failed'))
      errorUtils(err, dispatch)
      console.log('Error2')
    }
  }

export const addPackTC =
  (data?: SetNewPackType): AppThunkType =>
  async dispatch => {
    try {
      const res = await packsAPI.setPack({ cardsPack: {} })

      dispatch(setAppStatusAC('loading'))
      console.log(res, 'addPackTC')
      if (res.request.status === 201) {
        dispatch(setAppStatusAC('succeeded'))
        // dispatch(getUserPacksAC(res.data))
      } else {
        dispatch(setAppStatusAC('failed'))
        console.log('Error1')
      }
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      dispatch(setAppStatusAC('failed'))
      errorUtils(err, dispatch)
      console.log('Error2')
    }
  }

export const updatePackTC =
  (data: UpdatePackType): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC('loading'))
      const res = await packsAPI.updatePack(data)

      if (res.data) {
        dispatch(setAppStatusAC('succeeded'))
        dispatch(getPacksTC())
      } else {
        dispatch(setAppStatusAC('failed'))
        console.log('Error1')
      }
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      dispatch(setAppStatusAC('failed'))
      errorUtils(err, dispatch)
      console.log('Error2')
    }
  }
export const deletePackTC =
  (data?: PacksParamsType): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC('loading'))
      const res = await packsAPI.deletePack(data)

      if (res.data) {
        dispatch(setAppStatusAC('succeeded'))
        dispatch(getPacksTC())
      } else {
        dispatch(setAppStatusAC('failed'))
        console.log('Error1')
      }
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      dispatch(setAppStatusAC('failed'))
      errorUtils(err, dispatch)
      console.log('Error2')
    }
  }
