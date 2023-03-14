import { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { packsAPI, PacksParamsType, ResponsePacksType, SetNewPackType } from './packs-api'

import { setAppStatusAC } from 'app/app-reducer'
import { AppThunkType } from 'app/store'
import { errorUtils } from 'common/utils/error-utils'

const initialState: ResponsePacksType = {
  cardPacks: [
    {
      cardsCount: 14,
      created: 'string',
      deckCover: 'string',
      grade: 3,
      more_id: 'string',
      name: 'string',
      path: 'string',
      private: false,
      rating: 2,
      shots: 1,
      type: 'string',
      updated: 'string',
      user_id: 'string',
      user_name: 'string',
      __v: 'string',
      _id: 'string',
    },
  ],
  cardPacksTotalCount: 14,
  // количество колод
  maxCardsCount: 4,
  minCardsCount: 0,
  page: 1, // выбранная страница
  pageCount: 4,
}

export const packsReducer = (state: ResponsePacksType = initialState, action: ActionsType): ResponsePacksType => {
  switch (action.type) {
    case 'getPacks': {
      const packsData = { ...action.payload.data }

      return { ...packsData }
    }

    case 'set-current-page': {
      return { ...state, page: action.payload.data.page }
    }

    case 'set-count-page': {
      return { ...state, pageCount: action.payload.data.pageCount }
    }

    // case 'changeUserName': {
    //   // const oldState = { ...state }
    //   const newName = action.payload.name1

    //   return { ...state, name: newName }
    // }
    // case 'changeCurrentName':
    //   return { ...state, currentName: action.payload.name2 }
    // case 'editMode':
    //   return { ...state, editedMode: action.payload.editedMode }
    default:
      return state
  }
}

export const getUserPacksAC = (data: ResponsePacksType) => ({ type: 'getPacks', payload: { data } } as const)

export const setCurrentPageAC = (data: ResponsePacksType) => ({ type: 'set-current-page', payload: { data } } as const)

export const setCountPageAC = (data: ResponsePacksType) => ({ type: 'set-count-page', payload: { data } } as const)

// export const setNewNameAC = (name1: string) => ({ type: 'changeUserName', payload: { name1 } } as const)
// export const setNewCurrnetNameAC = (name2: string) => ({ type: 'changeCurrentName', payload: { name2 } } as const)
// export const editedModeAC = (editedMode: boolean) => ({ type: 'editMode', payload: { editedMode } } as const)

export const getPacksTC =
  (data?: PacksParamsType): AppThunkType =>
  async dispatch => {
    try {
      const res = await packsAPI.getPacks(data)

      dispatch(setAppStatusAC('loading'))
      console.log(res, getPacksTC)

      if (res.data) {
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

export const addPackTC = (data?: SetNewPackType) => async (dispatch: Dispatch) => {
  try {
    const res = await packsAPI.setPack({ cardsPack: {} })

    dispatch(setAppStatusAC('loading'))

    if (res.data) {
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

type ActionsType = getUserPacksType | setCurrentPageType | setCountPageType

export type getUserPacksType = ReturnType<typeof getUserPacksAC>
export type setCurrentPageType = ReturnType<typeof setCurrentPageAC>
export type setCountPageType = ReturnType<typeof setCountPageAC>
