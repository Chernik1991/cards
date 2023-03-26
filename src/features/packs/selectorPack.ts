import { AppStateType } from 'store/store'

export const cardPacks = (state: AppStateType) => state.packs.cardPacks
export const page = (state: AppStateType) => state.packs.page
export const pageCount = (state: AppStateType) => state.packs.pageCount
export const cardPacksTotalCount = (state: AppStateType) => state.packs.cardPacksTotalCount
export const minCardsCount = (state: AppStateType) => state.packs.minCardsCount
export const maxCardsCount = (state: AppStateType) => state.packs.maxCardsCount
export const packAdditionalSettings = (state: AppStateType) => state.packsAdditionalSettings.cardsPack
export const packAdditionalSettingsName = (state: AppStateType) => state.packsAdditionalSettings.cardsPack.name
export const packAdditionalSettingsPrivate = (state: AppStateType) => state.packsAdditionalSettings.cardsPack.private
export const sort = (state: AppStateType) => state.packs.sort
export const search = (state: AppStateType) => state.packs.search
export const isMyPacks = (state: AppStateType) => state.packs.isMyPacks
export const min = (state: AppStateType) => state.packs.min
export const max = (state: AppStateType) => state.packs.max
export const filterOff = (state: AppStateType) => state.packs.filterOff
