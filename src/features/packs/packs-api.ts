import { AxiosResponse } from 'axios'

import { instance } from 'features/auth/auth-api'

export const packsAPI = {
  getPacks(params: PacksParamsType) {
    return instance.get<PacksParamsType, AxiosResponse<ResponsePacksType>>('cards/pack', {
      params,
    })
  },
  setPack(data: SetNewPackType) {
    return instance.post<SetNewPackType, AxiosResponse<ResponsePacksType>>('cards/pack', { cardsPack: { ...data } })
  },
  deletePack(data: string) {
    return instance.delete<string, AxiosResponse<ResponsePacksType>>('cards/pack', { params: { id: data } })
  },
  updatePack(data: UpdatePackType) {
    return instance.put<UpdatePackType, AxiosResponse<ResponsePacksType>>('cards/pack', { cardsPack: { ...data } })
  },
}
export type ResponsePacksType = {
  cardPacks: CardPacksType[]
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
  isMyPacks?: boolean
  sort: string
  search: string
  max: number
  min: number
  filterOff: boolean
}

export type CardPacksType = {
  cardsCount: number
  created: string
  deckCover: string
  grade: number
  more_id: string
  name: string
  path: string
  private: boolean
  rating: number
  shots: number
  type: string
  updated: string
  user_id: string
  user_name: string
  __v: string
  _id: string
}
export type PacksParamsType = {
  packName: string
  min: number
  max: number
  sortPacks: string
  page: number
  pageCount: number
  user_id?: string
  block?: boolean
}
export type SetNewPackType = {
  name: string
  deckCover: string
  private: boolean
}
export type UpdatePackType = {
  _id: string | undefined
  name: string
  private?: boolean
  deckCover: ''
}
