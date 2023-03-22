type ModalType = {
  cardsPack: {
    _id: string
    name?: string
    private?: boolean
    deckCover?: string
  }
}

const initialState: ModalType = {
  cardsPack: {
    _id: '',
  },
}

export const modalsReducer = (state: ModalType = initialState, action: ActionsType): ModalType => {
  switch (action.type) {
    case 'PACKS/UPDATE-PACK-ID': {
      const newState = { ...state }

      newState.cardsPack._id = action.payload.data

      return { ...state, ...newState }
    }
    case 'PACKS/UPDATE-PACK-PRIVATE': {
      const newState = { ...state }

      newState.cardsPack.private = action.payload.data

      return { ...state, ...newState }
    }
    case 'PACKS/ADD-NEW-PACK': {
      const newState = { ...state }

      newState.cardsPack.name = action.payload.data

      return { ...state, ...newState }
    }

    case 'PACKS/CLEAR-STATE': {
      const newState = { ...state }

      newState.cardsPack = { _id: '' }

      return { ...state, ...newState }
    }
    default:
      return state
  }
}

type ActionsType = updateUserPackIDType | updateUserPackPrivateType | addNewUserPackType | clearUserStateType

export type addNewUserPackType = ReturnType<typeof addNewUserPackAC>
export type updateUserPackIDType = ReturnType<typeof updateUserPackIDAC>
export type updateUserPackPrivateType = ReturnType<typeof updateUserPackPrivateAC>
export type clearUserStateType = ReturnType<typeof clearUserStateTypeAC>

export const addNewUserPackAC = (data: string) => ({ type: 'PACKS/ADD-NEW-PACK', payload: { data } } as const)
export const updateUserPackIDAC = (data: string) => ({ type: 'PACKS/UPDATE-PACK-ID', payload: { data } } as const)
export const updateUserPackPrivateAC = (data: boolean) =>
  ({ type: 'PACKS/UPDATE-PACK-PRIVATE', payload: { data } } as const)
export const clearUserStateTypeAC = () => ({ type: 'PACKS/CLEAR-STATE' } as const)
