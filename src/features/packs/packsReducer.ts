import { AxiosError } from 'axios'

import { setAppStatusAC } from 'app/app-reducer'
import { errorUtils } from 'common/utils/error-utils'
import { packsAPI, PacksParamsType, ResponsePacksType, SetNewPackType, UpdatePackType } from 'features/packs/packs-api'
import { AppThunkType } from 'store/store'

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
      _id: 'string',
    },
  ],
  cardPacksTotalCount: 0,
  // количество колод
  maxCardsCount: 0,
  minCardsCount: 0,
  page: 1, // выбранная страница
  pageCount: 4,
}

export const packsReducer = (state: ResponsePacksType = initialState, action: ActionsType): ResponsePacksType => {
  switch (action.type) {
    case 'PACKS/GET-PACKS': {
      const packsData = { ...action.payload.data }

      return { ...state, ...packsData }
    }
    default:
      return state
  }
}

export const getUserPacksAC = (data: ResponsePacksType) => ({ type: 'PACKS/GET-PACKS', payload: { data } } as const)

type ActionsType = getUserPacksType
export type getUserPacksType = ReturnType<typeof getUserPacksAC>

export const getPacksTC =
  (data: PacksParamsType): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC('loading'))
      const res = await packsAPI.getPacks(data)

      dispatch(setAppStatusAC('loading'))

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
      console.log('Error2 getPacksTC')
    }
  }

export const addPackTC =
  (data?: SetNewPackType, user_id?: string | null | undefined): AppThunkType =>
  async dispatch => {
    try {
      const settingsChecker = user_id ? { user_id } : {}
      const res = await packsAPI.setPack({ cardsPack: {} })

      dispatch(setAppStatusAC('loading'))
      console.log(res, 'addPackTC')
      if (res.request.status === 201) {
        dispatch(setAppStatusAC('succeeded'))
        dispatch(getPacksTC(settingsChecker))
      } else {
        dispatch(setAppStatusAC('failed'))
        console.log('Error1')
      }
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      dispatch(setAppStatusAC('failed'))
      errorUtils(err, dispatch)
      console.log('Error2 addPackTC')
    }
  }

export const updatePackTC =
  (data: UpdatePackType, user_id?: string | null | undefined): AppThunkType =>
  async dispatch => {
    try {
      const settingsChecker = user_id ? { user_id } : {}

      dispatch(setAppStatusAC('loading'))
      const res = await packsAPI.updatePack({ cardsPack: { _id: data.cardsPack._id, name: data.cardsPack.name } })

      if (res.data) {
        dispatch(setAppStatusAC('succeeded'))
        dispatch(getPacksTC(settingsChecker))
      } else {
        dispatch(setAppStatusAC('failed'))
        console.log('Error1')
      }
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      dispatch(setAppStatusAC('failed'))
      errorUtils(err, dispatch)
      console.log('Error2 updatePackTC')
    }
  }
export const deletePackTC =
  (data?: PacksParamsType, user_id?: string | null | undefined): AppThunkType =>
  async dispatch => {
    try {
      dispatch(setAppStatusAC('loading'))
      const res = await packsAPI.deletePack(data)
      const settingsChecker = user_id ? { user_id } : {}

      if (res.data) {
        dispatch(setAppStatusAC('succeeded'))
        dispatch(getPacksTC(settingsChecker))
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
