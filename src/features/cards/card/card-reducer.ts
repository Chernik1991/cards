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

const initialState: InitialStateType = {
  cards: [
    {
      _id: '',
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

export const cardsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  console.log('cardsReducer')
  switch (action.type) {
    case 'CARDS/SET-CARDS-DATA':
      // eslint-disable-next-line no-case-declarations
      const cardsData = { ...action.payload.data }

      return { ...cardsData }

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
//thunks
export const GetCardsTC =
  (data: GetCardsParamsType): AppThunkType =>
  async dispatch => {
    console.log('GetCardsTC')
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
    console.log('CreateCardsTC')
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
    console.log('DeleteCardsTC')
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
    console.log('UpdateCardsTC')
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
type ActionsType = ReturnType<typeof setCardsDataAC>
type InitialStateType = ResponseGetCardsType
