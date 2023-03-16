import { AppStateType } from 'store/store'

export const currentNameProfile = (state: AppStateType) => state.profile.currentName
export const userIdProfile = (state: AppStateType) => state.profile._id
export const editedModeProfile = (state: AppStateType) => state.profile.editedMode
export const nameProfile = (state: AppStateType) => state.profile.name
export const emailProfile = (state: AppStateType) => state.profile.email
