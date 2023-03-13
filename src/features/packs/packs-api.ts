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
  cardPacks: PackType[]
  cardPacksTotalCount: number
  // количество колод
  maxCardsCount: number
  minCardsCount: number
  page: number // выбранная страница
  pageCount: number
}

export type PackType = {
  _id: string
  user_id: string
  name: string
  cardsCount: number
  created: string
  updated: string
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
