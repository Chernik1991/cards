import { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { packsAPI, PacksParamsType, ResponsePacksType, SetNewPackType } from './packs-api'

import { setAppStatusAC } from 'app/app-reducer'
import { errorUtils } from 'common/utils/error-utils'

const initialState: ResponsePacksType = {
  cardPacks: [
    {
      _id: '5eb6cef840b7bf1cf0d8122d',
      user_id: '5eb543f6bea3ad21480f1ee7',
      name: 'no Name',
      cardsCount: 25,
      created: '2020-05-09T15:40:40.339Z',
      updated: '2020-05-09T15:40:40.339Z',
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
// export const setNewNameAC = (name1: string) => ({ type: 'changeUserName', payload: { name1 } } as const)
// export const setNewCurrnetNameAC = (name2: string) => ({ type: 'changeCurrentName', payload: { name2 } } as const)
// export const editedModeAC = (editedMode: boolean) => ({ type: 'editMode', payload: { editedMode } } as const)

export const getPacksTC = (data?: PacksParamsType) => async (dispatch: Dispatch) => {
  try {
    const res = await packsAPI.getPacks(data)

    dispatch(setAppStatusAC('loading'))

    if (res.data.page) {
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

type ActionsType = ReturnType<typeof getUserPacksAC>
