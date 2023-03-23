import { setAppStatusAC } from 'app/app-reducer'
import { errorUtils } from 'common/utils/error-utils'
import {
  cardsAPI,
  CardsType,
  DeleteCardsType,
  GetCardsParamsType,
  ResponseGetCardsType,
  SetCardType,
  UpdateCardType,
} from 'features/cards/cards-api'
import { AppThunkType } from 'store/store'

const initialState: ResponseGetCardsType = {
  cards: [] as CardsType[],
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
  setPackId: '',
}

export const cardsReducer = (state: ResponseGetCardsType = initialState, action: ActionsType): ResponseGetCardsType => {
  switch (action.type) {
    case 'CARDS/SET-CARDS-DATA':
      return { ...state, ...action.payload.data }
    case 'CARDS/SET-CARDS-DATA-LEARN':
      return { ...state, ...action.payload.data }
    case 'CLEAR-DATA':
      return { ...state, cards: [] }
    case 'CARDS/SET-PACK-ID':
      return {
        ...state,
        setPackId: action.payload.data,
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

export const setCardLearnAC = (data: CardsType[]) =>
  ({
    type: 'CARDS/SET-CARDS-DATA-LEARN',
    payload: { data },
  } as const)

export const setPackIdAC = (data: string) =>
  ({
    type: 'CARDS/SET-PACK-ID',
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

      dispatch(setCardsDataAC(res.data))
      dispatch(setAppStatusAC('succeeded'))
    } catch (e: any) {
      errorUtils(e, dispatch)
      dispatch(setAppStatusAC('failed'))
    } finally {
      dispatch(setAppStatusAC('succeeded'))
    }
  }
export const CreateCardsTC =
  (data: SetCardType): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      console.log(data)

      const res = await cardsAPI.setCards(data)

      dispatch(GetCardsTC({ cardsPack_id: data.cardsPack_id }))
      dispatch(setAppStatusAC('succeeded'))
    } catch (e: any) {
      errorUtils(e, dispatch)
      dispatch(setAppStatusAC('failed'))
    }
  }
export const DeleteCardsTC =
  (data: DeleteCardsType): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await cardsAPI.delCards(data.id)

      dispatch(GetCardsTC({ cardsPack_id: data.cardsPack_id }))
      dispatch(setAppStatusAC('succeeded'))
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
        _id: data.id,
        question: data.question,
      })

      dispatch(GetCardsTC({ cardsPack_id: data.cardsPack_id }))
      dispatch(setAppStatusAC('succeeded'))
    } catch (e: any) {
      errorUtils(e, dispatch)
      dispatch(setAppStatusAC('failed'))
    }
  }
//types
export type ActionsType = setCardsData | clearCardData | setPackId | setCardLearn

export type setCardsData = ReturnType<typeof setCardsDataAC>
export type clearCardData = ReturnType<typeof clearCardDataAC>
export type setPackId = ReturnType<typeof setPackIdAC>
export type setCardLearn = ReturnType<typeof setCardLearnAC>
