import { setAppStatusAC } from 'app/app-reducer'
import { AppThunkType } from 'app/store'
import { errorUtils } from 'common/utils/error-utils'
import {
  cardsAPI,
  DeleteCardsType,
  GetCardsParamsType,
  ResponseGetCardsType,
  SetCardParamsType,
  UpdateCardType,
} from 'features/cards/cards-api'

const initialState: ResponseGetCardsType = {
  cards: [
    // {
    //   _id: '',
    //   cardsPack_id: '',
    //   user_id: '',
    //   question: 'No question',
    //   answer: 'No answer',
    //   grade: 0,
    //   shots: 0,
    //   comments: '',
    //   type: '',
    //   rating: 0,
    //   more_id: '',
    //   created: '',
    //   updated: '',
    //   __v: 0,
    // },
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
  maxCardsCount: 0,
  minCardsCount: 0,
}

export const cardsReducer = (state: ResponseGetCardsType = initialState, action: ActionsType): ResponseGetCardsType => {
  switch (action.type) {
    case 'CARDS/SET-CARDS-DATA':
      return { ...action.payload.data }
    case 'CLEAR-DATA':
      return { ...state, cards: [] }
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

export const clearCardDataAC = () => ({ type: 'CLEAR-DATA' } as const)
//thunks
export const GetCardsTC =
  (data: GetCardsParamsType): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await cardsAPI.getCards(data)

      console.log(res, 'getCards')
      console.log(res.data.cards, 'res.data.cards')
      console.log(res.data, 'res.data')
      if (res.request.status === 200) {
        dispatch(setCardsDataAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
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
        dispatch(GetCardsTC({ cardsPack_id: data.card.cardsPack_id }))
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
  (data: DeleteCardsType): AppThunkType =>
  async dispatch => {
    console.log(data, 'data')
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await cardsAPI.delCards(data.id)

      console.log(res, 'DeleteCardsTC')
      if (res.request.status === 200) {
        dispatch(GetCardsTC({ cardsPack_id: data.cardsPack_id }))
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
  (data: UpdateCardType): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await cardsAPI.updateCards({
        card: {
          _id: data.id,
          question: '1234',
        },
      })

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
export type ActionsType = setCardsData | clearCardData

export type setCardsData = ReturnType<typeof setCardsDataAC>
export type clearCardData = ReturnType<typeof clearCardDataAC>
