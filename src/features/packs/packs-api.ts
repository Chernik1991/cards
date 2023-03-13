import { AxiosResponse } from 'axios'

import { instance } from 'features/auth/auth-api'

export const packsAPI = {
  getPacks(data?: PacksParamsType) {
    return instance.get<PacksParamsType, AxiosResponse<ResponsePacksType>>('cards/pack', data)
  },
  setPack(data?: SetNewPackType) {
    return instance.post<SetNewPackType, AxiosResponse<ResponsePacksType>>('cards/pack', data)
  },
  deletePack(id: any) {
    return instance.delete<{}, AxiosResponse<ResponsePacksType>>('cards/pack', id)
  },
  updatePack(data: UpdatePackType) {
    return instance.put<UpdatePackType, AxiosResponse<ResponsePacksType>>('cards/pack', data)
  },
}

export type ResponsePacksType = {
  cardPacks: [
    {
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
  ]
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
}

export type PacksParamsType = {
  params: {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number

    user_id?: string

    block?: boolean
  }
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
