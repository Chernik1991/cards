import { setAppStatusAC } from 'app/app-reducer'
import { AppThunkType } from 'app/store'
import { errorUtils } from 'common/utils/error-utils'
import {
  cardsAPI,
  DeleteCardsParamsType,
  GetCardsParamsType,
  ResponseGetCardsType,
  SetCardParamsType,
  UpdateCardParamsType,
} from 'features/cards/cards-api'

const initialState: ResponseGetCardsType = {
  cards: [
    {
      _id: '1',
      cardsPack_id: '',
      user_id: '',
      question: 'No question',
      answer: 'No answer',
      grade: 0,
      shots: 0,
      comments: '',
      type: '',
      rating: 0,
      more_id: '',
      created: '',
      updated: '',
      __v: 0,
    },
  ],
  cardsTotalCount: 0,
  token: '',
  tokenDeathTime: 0,
  maxGrade: 0,
  minGrade: 0,
  packCreated: '',
  packName: '',
  packPrivate: false,
  packUpdated: '',
  page: 0,
  packUserId: '',
  pageCount: 0,
}

export const cardsReducer = (state: ResponseGetCardsType = initialState, action: ActionsType): ResponseGetCardsType => {
  switch (action.type) {
    case 'CARDS/SET-CARDS-DATA':
      return { ...state, ...action.payload.data }
    case 'CARDS/SET-CURRENT-PAGE': {
      return { ...state, page: action.payload.data.page }
    }
    case 'CARDS/SET-CARDS-PAGE-COUNT': {
      return { ...state, pageCount: action.payload.data.pageCount }
    }
    default:
      return state
  }
}

//action
export const setCardsDataAC = (data: ResponseGetCardsType) =>
  ({
    type: 'CARDS/SET-CARDS-DATA',
    payload: { data },
  } as const)

export const setCardsCurrentPageAC = (data: ResponseGetCardsType) =>
  ({
    type: 'CARDS/SET-CURRENT-PAGE',
    payload: { data },
  } as const)
export const setCardsPageCountAC = (data: ResponseGetCardsType) =>
  ({
    type: 'CARDS/SET-CARDS-PAGE-COUNT',
    payload: { data },
  } as const)
//thunks
export const GetCardsTC =
  (data: GetCardsParamsType): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await cardsAPI.getCards(data)

      console.log(res, 'getCards')
      console.log(res.data.cards)
      if (res.request.status === 200) {
        if (res.data.cards.length > 0) {
          dispatch(setCardsDataAC(res.data))
          dispatch(setAppStatusAC('succeeded'))
        }
      } else {
        dispatch(setAppStatusAC('failed'))
      }
    } catch (e: any) {
      errorUtils(e, dispatch)
      dispatch(setAppStatusAC('failed'))
    } finally {
      dispatch(setAppStatusAC('succeeded'))
    }
  }
export const CreateCardsTC =
  (data: SetCardParamsType): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await cardsAPI.setCards(data)

      console.log(res, 'CreateCardsTC')
      if (res.request.status === 201) {
        // dispatch(setCardsDataAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        dispatch(setAppStatusAC('failed'))
      }
    } catch (e: any) {
      errorUtils(e, dispatch)
      dispatch(setAppStatusAC('failed'))
    }
  }
export const DeleteCardsTC =
  (data: DeleteCardsParamsType): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await cardsAPI.delCards(data)

      console.log(res, 'DeleteCardsTC')
      if (res.request.status === 200) {
        // dispatch(setCardsDataAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        dispatch(setAppStatusAC('failed'))
      }
    } catch (e: any) {
      errorUtils(e, dispatch)
      dispatch(setAppStatusAC('failed'))
    }
  }
export const UpdateCardsTC =
  (data: UpdateCardParamsType): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await cardsAPI.updateCards(data)

      console.log(res, 'UpdateCardTC')
      if (res.request.status === 200) {
        // dispatch(setCardsDataAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        dispatch(setAppStatusAC('failed'))
      }
    } catch (e: any) {
      errorUtils(e, dispatch)
      dispatch(setAppStatusAC('failed'))
    }
  }
//types
export type ActionsType = setCardsData | setCardsCurrentPage | setCardsPageCount

export type setCardsData = ReturnType<typeof setCardsDataAC>
export type setCardsCurrentPage = ReturnType<typeof setCardsCurrentPageAC>
export type setCardsPageCount = ReturnType<typeof setCardsPageCountAC>

/*
type InitialStateType = {
  car: ResponseGetCardsType
}
*/
