import { setAppStatusAC } from 'app/app-reducer'
import { errorUtils } from 'common/utils/error-utils'
import {
  packsAPI,
  ResponsePacksType,
  searchParamsPacksType,
  SetNewPackType,
  UpdatePackType,
} from 'features/packs/packs-api'
import { AppThunkType } from 'store/store'

const initialState: ResponsePacksType = {
  cardPacks: [],
  cardPacksTotalCount: 0,
  maxCardsCount: 0,
  minCardsCount: 0,
  max: 0,
  min: 0,
  page: 1,
  pageCount: 4,
  isMyPacks: false,
  sort: '0updated',
  search: '',
  filterOff: false,
  searchParamsPacks: {
    user_id: '',
    page: 1,
    pageCount: 4,
    sortPacks: '0updated',
    packName: '',
    max: 0,
    min: 0,
  },
}

export const packsReducer = (state: ResponsePacksType = initialState, action: ActionsType): ResponsePacksType => {
  switch (action.type) {
    case 'PACKS/GET-PACKS': {
      return { ...state, ...action.payload.data, filterOff: false }
    }
    case 'PACKS/IS-MY-PACKS': {
      return { ...state, isMyPacks: action.payload.isMyPacks }
    }
    case 'PACKS/SEARCH-PACKS': {
      return { ...state, search: action.payload.search }
    }
    case 'PACKS/SORT-PACKS': {
      return { ...state, sort: action.payload.sort }
    }
    case 'PACKS/PAGE-PACKS': {
      return { ...state, page: action.payload.page }
    }
    case 'PACKS/PAGE-COUNT-PACKS': {
      return { ...state, pageCount: action.payload.pageCount }
    }
    case 'PACKS/MAX-CARD-COUNT-PACKS': {
      return { ...state, max: action.payload.max }
    }
    case 'PACKS/MIN-CARD-COUNT-PACKS': {
      return { ...state, min: action.payload.min }
    }
    case 'PACKS/FILTER-ALL-OFF-PACKS': {
      return {
        ...state,
        pageCount: action.payload.pageCount,
        page: action.payload.page,
        sort: action.payload.sort,
        search: action.payload.search,
        filterOff: action.payload.filterOff,
        min: action.payload.min,
        max: action.payload.max,
      }
    }
    case 'PACKS/SEARCH-PARAMS-PACKS': {
      return {
        ...state,
        searchParamsPacks: action.payload.searchParamsPacks,
      }
    }
    default:
      return state
  }
}
export const getUserPacksAC = (data: ResponsePacksType) => ({ type: 'PACKS/GET-PACKS', payload: { data } } as const)
export const isMyPacksAC = (isMyPacks: boolean) => ({ type: 'PACKS/IS-MY-PACKS', payload: { isMyPacks } } as const)
export const searchPacksAC = (search: string) => ({ type: 'PACKS/SEARCH-PACKS', payload: { search } } as const)
export const sortPacksAC = (sort: string) => ({ type: 'PACKS/SORT-PACKS', payload: { sort } } as const)
export const pagePacksAC = (page: number) => ({ type: 'PACKS/PAGE-PACKS', payload: { page } } as const)
export const pageCountPacksAC = (pageCount: number) =>
  ({
    type: 'PACKS/PAGE-COUNT-PACKS',
    payload: { pageCount },
  } as const)
export const maxAC = (max: number) =>
  ({
    type: 'PACKS/MAX-CARD-COUNT-PACKS',
    payload: { max },
  } as const)
export const minAC = (min: number) =>
  ({
    type: 'PACKS/MIN-CARD-COUNT-PACKS',
    payload: { min },
  } as const)
export const filterAllOffPacksAC = (filterOff: boolean, minCardsCount: number, maxCardsCount: number) =>
  ({
    type: 'PACKS/FILTER-ALL-OFF-PACKS',
    payload: {
      search: '',
      sort: '0updated',
      page: 1,
      pageCount: 4,
      filterOff: !filterOff,
      min: minCardsCount,
      max: maxCardsCount,
    },
  } as const)
export const setSearchParamsPacksAC = (searchParamsPacks: searchParamsPacksType) =>
  ({
    type: 'PACKS/SEARCH-PARAMS-PACKS',
    payload: { searchParamsPacks },
  } as const)

type ActionsType =
  | getUserPacksType
  | setMyPacksType
  | searchPacksType
  | sortPacksType
  | pagePacksType
  | pageCountPacksType
  | maxCardsCountPacksType
  | minCardsCountPacksType
  | filterAllOffPacksType
  | setSearchParamsPacksType

export type getUserPacksType = ReturnType<typeof getUserPacksAC>
export type setMyPacksType = ReturnType<typeof isMyPacksAC>
export type searchPacksType = ReturnType<typeof searchPacksAC>
export type sortPacksType = ReturnType<typeof sortPacksAC>
export type pagePacksType = ReturnType<typeof pagePacksAC>
export type pageCountPacksType = ReturnType<typeof pageCountPacksAC>
export type maxCardsCountPacksType = ReturnType<typeof maxAC>
export type minCardsCountPacksType = ReturnType<typeof minAC>
export type filterAllOffPacksType = ReturnType<typeof filterAllOffPacksAC>
export type setSearchParamsPacksType = ReturnType<typeof setSearchParamsPacksAC>

export const getPacksTC = (): AppThunkType => async (dispatch, getState) => {
  dispatch(setAppStatusAC('loading'))
  const { pageCount, page, sort, search, isMyPacks, max, min } = getState().packs
  const userID = getState().profile._id

  try {
    const res = isMyPacks
      ? await packsAPI.getPacks({
          user_id: userID,
          page,
          pageCount,
          sortPacks: sort,
          packName: search,
          max: max,
          min: min,
        })
      : await packsAPI.getPacks({
          page,
          pageCount,
          sortPacks: sort,
          packName: search,
          max: max,
          min: min,
        })

    dispatch(
      setSearchParamsPacksAC({
        user_id: userID,
        page,
        pageCount,
        sortPacks: sort,
        packName: search,
        max: max,
        min: min,
      })
    )
    dispatch(setAppStatusAC('succeeded'))
    dispatch(getUserPacksAC(res.data))
  } catch (e: any) {
    errorUtils(e, dispatch)
    dispatch(setAppStatusAC('failed'))
  }
}

export const addPackTC =
  (data: SetNewPackType): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await packsAPI.setPack(data)

      dispatch(setAppStatusAC('succeeded'))
    } catch (e: any) {
      errorUtils(e, dispatch)
      dispatch(setAppStatusAC('failed'))
    }
  }

export const updatePackTC =
  (data: UpdatePackType): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await packsAPI.updatePack(data)

      dispatch(setAppStatusAC('succeeded'))
    } catch (e: any) {
      errorUtils(e, dispatch)
      dispatch(setAppStatusAC('failed'))
    }
  }
export const deletePackTC =
  (data: string): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await packsAPI.deletePack(data)

      dispatch(setAppStatusAC('succeeded'))
    } catch (e: any) {
      errorUtils(e, dispatch)
      dispatch(setAppStatusAC('failed'))
    }
  }
