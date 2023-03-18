import { PacksParamsType } from 'features/packs/packs-api'

const initialState: PacksParamsType = {
  packName: '',
  min: null,
  max: null,
  sortPacks: null,
  page: null,
  pageCount: null,

  user_id: null,

  block: false,
  id: null,
}

export const paramsReducer = (state: PacksParamsType = initialState, action: ActionsType): PacksParamsType => {
  switch (action.type) {
    case 'PACKS/SET-PARAMS': {
      const packsData = { ...action.payload.data }

      return { ...packsData }
    }
    default:
      return state
  }
}

export const setUserParamsAC = (data: PacksParamsType) => ({ type: 'PACKS/SET-PARAMS', payload: { data } } as const)

type ActionsType = setUserParamsType
export type setUserParamsType = ReturnType<typeof setUserParamsAC>
