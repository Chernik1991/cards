import { AxiosResponse } from 'axios'

import { instance } from 'features/auth/auth-api'

export const packsAPI = {
  getPacks(params: PacksParamsType) {
    return instance.get<PacksParamsType, AxiosResponse<ResponsePacksType>>('cards/pack', { params })
  },
  setPack(data?: SetNewPackType) {
    return instance.post<SetNewPackType, AxiosResponse<ResponsePacksType>>('cards/pack', data)
  },
  deletePack(data?: PacksParamsType) {
    return instance.delete<{}, AxiosResponse<ResponsePacksType>>('cards/pack', { params: { ...data } })
  },
  updatePack(data: UpdatePackType) {
    return instance.put<UpdatePackType, AxiosResponse<ResponsePacksType>>('cards/pack', data)
  },
}

export type ResponsePacksType = {
  cardPacks: [PackType]
  cardPacksTotalCount: number
  // количество колод
  maxCardsCount: number
  minCardsCount: number
  page: number // выбранная страница
  pageCount: number
}

export type PackType = {
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
  packName?: string
  min?: number | null
  max?: number | null
  sortPacks?: string | null
  page?: number | null
  pageCount?: number | null

  user_id?: string | null | undefined

  block?: boolean
  id?: string | null
}

export type SetNewPackType = {
  cardsPack: {
    name?: string
    deckCover?: string
    private?: boolean
  }
}

export type UpdatePackType = {
  cardsPack: {
    _id: string
    name: string
  }
}
