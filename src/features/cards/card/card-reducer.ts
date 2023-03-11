import { setAppStatusAC } from 'app/app-reducer'
import { AppThunkType } from 'app/store'
import { errorUtils } from 'common/utils/error-utils'
import { cardsAPI, ReadCardsParamsType, ResponseReadCards } from 'features/cards/cards-api'

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
export const setCardsDataAC = (data: ResponseReadCards) =>
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
      dispatch(setCardsDataAC(res.data))
      dispatch(setAppStatusAC('succeeded'))
    } catch (e: any) {
      errorUtils(e, dispatch)
      dispatch(setAppStatusAC('failed'))
    }
  }

//types
type ActionsType = ReturnType<typeof setCardsDataAC>
type InitialStateType = {
  data: ResponseReadCards
}
