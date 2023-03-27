import { setAppStatusAC } from 'app/app-reducer'
import { errorUtils } from 'common/utils/error-utils'
import {
  cardsAPI,
  CardsType,
  DeleteCardsType,
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
  page: 1,
  packUserId: '',
  pageCount: 4,
  maxCardsCount: 0,
  minCardsCount: 0,
  cardsPack_id: '',
  cardQuestion: '',
  cardAnswer: '',
  sortCards: '0updated',
  card_id: '',
}

export const cardsReducer = (state: ResponseGetCardsType = initialState, action: ActionsType): ResponseGetCardsType => {
  switch (action.type) {
    case 'CARDS/SET-CARDS-DATA':
      return { ...state, ...action.payload.data }
    case 'CARDS/SET-PACK-NAME':
      return { ...state, packName: action.payload.data }
    case 'CARDS/SET-CARDS-DATA-LEARN':
      return { ...state, ...action.payload.data }
    case 'CLEAR-DATA':
      return { ...state, cards: [] }
    case 'CARDS/SET-CARDS-PACK-ID':
      return {
        ...state,
        cardsPack_id: action.payload.cardsPack_id,
      }
    case 'CARDS/PAGE': {
      return { ...state, page: action.payload.page }
    }
    case 'CARDS/PAGE-COUNT': {
      return { ...state, pageCount: action.payload.pageCount }
    }
    case 'CARDS/CARD-QUESTION': {
      return { ...state, cardQuestion: action.payload.cardQuestion }
    }
    case 'CARDS/CARD-ANSWER': {
      return { ...state, cardAnswer: action.payload.cardAnswer }
    }
    case 'CARDS/SORT-CARDS': {
      return { ...state, sortCards: action.payload.sortCards }
    }
    case 'CARDS/SET-PRIVATE-PACK': {
      return {
        ...state,
        packPrivate: action.payload.private,
      }
    }
    case 'CARDS/SET-CARDS-ID':
      return {
        ...state,
        card_id: action.payload.card_id,
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
export const setPackNameAC = (data: string) =>
  ({
    type: 'CARDS/SET-PACK-NAME',
    payload: { data },
  } as const)
export const setCardLearnAC = (data: CardsType[]) =>
  ({
    type: 'CARDS/SET-CARDS-DATA-LEARN',
    payload: { data },
  } as const)

export const setCardsPackIdAC = (cardsPack_id: string) =>
  ({
    type: 'CARDS/SET-CARDS-PACK-ID',
    payload: { cardsPack_id },
  } as const)
export const setCardIdAC = (card_id: string) =>
  ({
    type: 'CARDS/SET-CARDS-ID',
    payload: { card_id },
  } as const)

export const clearCardDataAC = () => ({ type: 'CLEAR-DATA' } as const)
export const pageCardsAC = (page: number) => ({ type: 'CARDS/PAGE', payload: { page } } as const)
export const pageCountCardsAC = (pageCount: number) =>
  ({
    type: 'CARDS/PAGE-COUNT',
    payload: { pageCount },
  } as const)
export const cardQuestionAC = (cardQuestion: string) =>
  ({
    type: 'CARDS/CARD-QUESTION',
    payload: { cardQuestion },
  } as const)
export const cardAnswerAC = (cardAnswer: string) =>
  ({
    type: 'CARDS/CARD-ANSWER',
    payload: { cardAnswer },
  } as const)
export const sortCardsAC = (sortCards: string) =>
  ({
    type: 'CARDS/SORT-CARDS',
    payload: { sortCards },
  } as const)
export const setPrivatePackAC = (private_: boolean) =>
  ({
    type: 'CARDS/SET-PRIVATE-PACK',
    payload: { private: private_ },
  } as const)
//types
export type ActionsType =
  | setCardsData
  | clearCardData
  | setCardsPackId
  | setCardLearn
  | pageCards
  | pageCountCards
  | cardQuestion
  | sortCards
  | setPackName
  | setPrivatePackType
  | setCardIdType
  | cardAnswerType

export type setCardsData = ReturnType<typeof setCardsDataAC>
export type clearCardData = ReturnType<typeof clearCardDataAC>
export type setCardsPackId = ReturnType<typeof setCardsPackIdAC>
export type setCardLearn = ReturnType<typeof setCardLearnAC>
export type pageCards = ReturnType<typeof pageCardsAC>
export type pageCountCards = ReturnType<typeof pageCountCardsAC>
export type cardQuestion = ReturnType<typeof cardQuestionAC>
export type sortCards = ReturnType<typeof sortCardsAC>
export type setPackName = ReturnType<typeof setPackNameAC>
export type setPrivatePackType = ReturnType<typeof setPrivatePackAC>
export type setCardIdType = ReturnType<typeof setCardIdAC>
export type cardAnswerType = ReturnType<typeof cardAnswerAC>

//thunks
export const GetCardsTC = (): AppThunkType => async (dispatch, getState) => {
  dispatch(setAppStatusAC('loading'))
  const { sortCards, cardQuestion, cardsPack_id, page, pageCount } = getState().cards

  try {
    const res = await cardsAPI.getCards({
      cardsPack_id: cardsPack_id,
      cardQuestion: cardQuestion,
      page: page,
      pageCount: pageCount,
      sortCards: sortCards,
    })

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

      dispatch(GetCardsTC())
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

      dispatch(GetCardsTC())
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
        answer: data.answer,
      })

      dispatch(GetCardsTC())
      dispatch(setAppStatusAC('succeeded'))
    } catch (e: any) {
      errorUtils(e, dispatch)
      dispatch(setAppStatusAC('failed'))
    }
  }
