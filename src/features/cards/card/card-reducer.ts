import { setAppStatusAC } from 'app/app-reducer'
import { AppThunkType } from 'app/store'
import { errorUtils } from 'common/utils/error-utils'
import {
  cardsAPI,
  CreateCardParamsType,
  DeleteCardsParamsType,
  ReadCardsParamsType,
  ResponseReadCardsType,
  UpdateCardParamsType,
} from 'features/cards/cards-api'

const initialState: InitialStateType = {
  data: {
    cards: [],
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
  },
}

export const cardsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'CARDS/SET-CARDS-DATA':
      return { ...state, data: action.payload.data }
    default:
      return state
  }
}

//action
export const setCardsDataAC = (data: ResponseReadCardsType) =>
  ({
    type: 'CARDS/SET-CARDS-DATA',
    payload: { data },
  } as const)
//thunks
export const GetCardsTC =
  (data: ReadCardsParamsType): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await cardsAPI.readCards(data)

      console.log(res, 'loginTC')
      console.log(res.data.cards)
      if (res.request.status === 200) {
        dispatch(setCardsDataAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        dispatch(setAppStatusAC('failed'))
      }
    } catch (e: any) {
      errorUtils(e, dispatch)
      dispatch(setAppStatusAC('failed'))
    }
  }
export const CreateCardsTC =
  (data: CreateCardParamsType): AppThunkType =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await cardsAPI.createCards(data)

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
type ActionsType = ReturnType<typeof setCardsDataAC>
type InitialStateType = {
  data: ResponseReadCardsType
}
