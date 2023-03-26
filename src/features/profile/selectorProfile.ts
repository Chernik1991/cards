import { AppStateType } from 'store/store'

export const currentName = (state: AppStateType) => state.profile.currentName
export const _id = (state: AppStateType) => state.profile._id
export const editedMode = (state: AppStateType) => state.profile.editedMode
export const name = (state: AppStateType) => state.profile.name
export const email = (state: AppStateType) => state.profile.email
