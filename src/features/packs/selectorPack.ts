import { AppStateType } from 'store/store'

export const packCardPacks = (state: AppStateType) => state.packs.cardPacks
export const packPage = (state: AppStateType) => state.packs.page
export const packPageCount = (state: AppStateType) => state.packs.pageCount
export const packCardPacksTotalCount = (state: AppStateType) => state.packs.cardPacksTotalCount
export const packMinCardsCount = (state: AppStateType) => state.packs.minCardsCount
export const packMaxCardsCount = (state: AppStateType) => state.packs.maxCardsCount
export const packMyPacks = (state: AppStateType) => state.packs.myPacks
export const packAdditionalSettings = (state: AppStateType) => state.packsAdditionalSettings.cardsPack
export const packAdditionalSettingsName = (state: AppStateType) => state.packsAdditionalSettings.cardsPack.name
export const packAdditionalSettingsPrivate = (state: AppStateType) => state.packsAdditionalSettings.cardsPack.private
