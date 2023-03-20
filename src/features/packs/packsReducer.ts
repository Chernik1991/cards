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
  maxCardsCount: 0,
  minCardsCount: 0,
  page: 1,
  pageCount: 4,
  myPacks: false,
}

export const packsReducer = (state: ResponsePacksType = initialState, action: ActionsType): ResponsePacksType => {
  switch (action.type) {
    case 'PACKS/GET-PACKS': {
      return { ...state, ...action.payload.data }
    }
    case 'PACKS/SET-MY-PACKS': {
      return { ...state, myPacks: action.payload.myPacks }
    }
    case 'PACKS/UPDATE-PACK-NAME': {
      const newState = { ...state }

      newState.cardPacks[0].name = action.payload.data.cardsPack.name

      return { ...state, ...newState }
    }
    case 'PACKS/UPDATE-PACK-PRIVATE': {
      const newState = { ...state }

      newState.cardPacks[0].private = action.payload.data.cardsPack.private

      return { ...state, ...newState }
    }
    case 'PACKS/ADD-NEW-PACK': {
      const newState = { ...state }

      newState.cardPacks[0].name = action.payload.data.cardsPack.name
      newState.cardPacks[0].private = action.payload.data.cardsPack.private

      return { ...state, ...newState }
    }
    default:
      return state
  }
}

export const getUserPacksAC = (data: ResponsePacksType) => ({ type: 'PACKS/GET-PACKS', payload: { data } } as const)
export const addNewUserPackAC = (data: UpdatePackType) => ({ type: 'PACKS/ADD-NEW-PACK', payload: { data } } as const)
export const updateUserPackNameAC = (data: UpdatePackType) =>
  ({ type: 'PACKS/UPDATE-PACK-NAME', payload: { data } } as const)
export const updateUserPackPrivateAC = (data: UpdatePackType) =>
  ({ type: 'PACKS/UPDATE-PACK-PRIVATE', payload: { data } } as const)
export const setMyPacksAC = (myPacks: boolean) => ({ type: 'PACKS/SET-MY-PACKS', payload: { myPacks } } as const)

type ActionsType =
  | getUserPacksType
  | setMyPacksType
  | updateUserPackNameType
  | updateUserPackPrivateType
  | addNewUserPackType
export type getUserPacksType = ReturnType<typeof getUserPacksAC>
export type setMyPacksType = ReturnType<typeof setMyPacksAC>
export type addNewUserPackType = ReturnType<typeof addNewUserPackAC>
export type updateUserPackNameType = ReturnType<typeof updateUserPackNameAC>
export type updateUserPackPrivateType = ReturnType<typeof updateUserPackPrivateAC>

export const getPacksTC =
  (data: PacksParamsType): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await packsAPI.getPacks(data)

      dispatch(setAppStatusAC('succeeded'))
      dispatch(getUserPacksAC(res.data))
    } catch (e: any) {
      errorUtils(e, dispatch)
      dispatch(setAppStatusAC('failed'))
    }
  }

export const addPackTC =
  (data?: SetNewPackType, user_id?: string | null | undefined): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const settingsChecker = user_id ? { user_id } : {}
      const res = await packsAPI.setPack({ cardsPack: {} })

      dispatch(setAppStatusAC('succeeded'))
      dispatch(getPacksTC(settingsChecker))
    } catch (e: any) {
      errorUtils(e, dispatch)
      dispatch(setAppStatusAC('failed'))
    }
  }

export const updatePackTC =
  (data: UpdatePackType, user_id?: string | null | undefined): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const settingsChecker = user_id ? { user_id } : {}
      const res = await packsAPI.updatePack({
        cardsPack: { _id: data.cardsPack._id, name: data.cardsPack.name, private: data.cardsPack.private },
      })

      dispatch(setAppStatusAC('succeeded'))
      dispatch(getPacksTC(settingsChecker))
    } catch (e: any) {
      errorUtils(e, dispatch)
      dispatch(setAppStatusAC('failed'))
    }
  }
export const deletePackTC =
  (data?: PacksParamsType, user_id?: string | null | undefined): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await packsAPI.deletePack(data)
      const settingsChecker = user_id ? { user_id } : {}

      dispatch(setAppStatusAC('succeeded'))
      dispatch(getPacksTC(settingsChecker))
    } catch (e: any) {
      errorUtils(e, dispatch)
      dispatch(setAppStatusAC('failed'))
    }
  }
