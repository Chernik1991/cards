import React, { useState } from 'react'

import { ModalBasic } from 'common/components/c11-SuperModal/ModalBasic'
import { AddNewCard } from 'features/cards/cardModals/AddCard/AddCard'
import { clearUserStateCardAC } from 'features/cards/cardModals/cardModalsReducer'
import { EditCard } from 'features/cards/cardModals/EditCard/EditCard'
import { CreateCardsTC, DeleteCardsTC, UpdateCardsTC } from 'features/cards/cards-reducer'
import * as cardsSelectors from 'features/cards/selectorCard'
import { cardsAdditionalSettingsAnswer } from 'features/cards/selectorCard'
import { DeleteModal } from 'features/packs/modals/DeleteModal/DeleteModal'
import { EditPack } from 'features/packs/modals/EditPack/EditPack'
import { clearUserStateTypeAC } from 'features/packs/modals/modalsReducer'
import { addPackTC, deletePackTC, updatePackTC } from 'features/packs/packsReducer'
import { useAppDispatch, useAppSelector } from 'store/store'

type Props = {
  open: string
  setOpen: (value: string) => void
}

export const Modals = ({ open, setOpen }: Props) => {
  const dispatch = useAppDispatch()
  const cardsPack_id = useAppSelector(cardsSelectors.cardsPack_id)
  const packName = useAppSelector(cardsSelectors.packName)
  const packPrivate = useAppSelector(cardsSelectors.packPrivate)
  const cardsQuestion = useAppSelector(cardsSelectors.cardQuestion)
  const cardsAnswer = useAppSelector(cardsAdditionalSettingsAnswer)
  const card_id = useAppSelector(cardsSelectors.card_id)
  const [error, setError] = useState(false)
  const [errorQuestion, SetErrorQuestion] = useState(false)
  const [errorAnswer, SetErrorAnswer] = useState(false)
  const handleClose = () => {
    // dispatch(clearUserStateTypeAC())
    setOpen('false')
  }

  const addNewPack = () => {
    dispatch(
      addPackTC({
        name: packName,
        // deckCover: packsAdditionalSettings.deckCover,
        private: packPrivate,
      })
    )
    dispatch(clearUserStateTypeAC())
    handleClose()
  }
  const updatePack = () => {
    dispatch(
      updatePackTC({
        _id: cardsPack_id,
        name: packName,
        private: packPrivate,
      })
    )
    handleClose()
  }
  const deletePack = () => {
    dispatch(deletePackTC(cardsPack_id))
    handleClose()
  }
  const addNewCardHandler = () => {
    if (cardsAnswer === '') {
      SetErrorAnswer(true)
      setTimeout(() => SetErrorAnswer(false), 3000)
    }
    if (cardsQuestion === '') {
      SetErrorQuestion(true)
      setTimeout(() => SetErrorQuestion(false), 3000)
    }
    if (cardsAnswer && cardsQuestion) {
      dispatch(
        CreateCardsTC({
          answer: cardsAnswer || '',
          question: cardsQuestion || '',
          cardsPack_id,
        })
      )
      // dispatch(clearUserStateCardAC())
      handleClose()
    }
  }
  const editCardHandler = () => {
    if (cardsAnswer === '') {
      SetErrorAnswer(true)
      setTimeout(() => SetErrorAnswer(false), 3000)
    }
    if (cardsQuestion === '') {
      SetErrorQuestion(true)
      setTimeout(() => SetErrorQuestion(false), 3000)
    }
    if (cardsAnswer && cardsQuestion) {
      dispatch(
        UpdateCardsTC({
          answer: cardsAnswer || '',
          question: cardsQuestion || '',
          id: card_id,
          cardsPack_id,
        })
      )
      // dispatch(clearUserStateCardAC())
      handleClose()
    }
  }
  const deleteCardHandler = () => {
    dispatch(
      DeleteCardsTC({
        id: card_id,
        cardsPack_id,
      })
    )
    dispatch(clearUserStateCardAC())
    handleClose()
  }

  return (
    <>
      <ModalBasic
        modalName={'Add new pack'}
        deleteSave={false}
        handleState={open === 'add-pack'}
        handleClose={handleClose}
        handleModalFn={addNewPack}
      >
        <EditPack
          id={'add-pack'}
          error={
            error ? <span style={{ fontSize: '10px', position: 'relative', top: '60px' }}>Pack name required</span> : ''
          }
        />
      </ModalBasic>
      <ModalBasic
        modalName={'Edit pack'}
        deleteSave={false}
        handleState={open === 'edit-pack'}
        handleClose={handleClose}
        handleModalFn={updatePack}
      >
        <EditPack
          id={'edit-pack'}
          packStatus={packPrivate}
          packName={packName}
          error={
            error ? <span style={{ fontSize: '10px', position: 'relative', top: '60px' }}>Pack name required</span> : ''
          }
        />
      </ModalBasic>
      <ModalBasic
        modalName={'Delete pack'}
        deleteSave={true}
        handleState={open === 'delete-pack'}
        handleClose={handleClose}
        handleModalFn={deletePack}
      >
        <DeleteModal name={packName} />
      </ModalBasic>
      <ModalBasic
        modalName={'Add new card'}
        deleteSave={false}
        handleState={open === 'add-card'}
        handleClose={handleClose}
        handleModalFn={addNewCardHandler}
      >
        <AddNewCard errorQuestion={errorQuestion} errorAnswer={errorAnswer} />
      </ModalBasic>
      <ModalBasic
        modalName={'Edit card'}
        deleteSave={false}
        handleState={open === 'edit-card'}
        handleClose={handleClose}
        handleModalFn={editCardHandler}
      >
        <EditCard
          errorQuestion={errorQuestion}
          errorAnswer={errorAnswer}
          valueAnswer={cardsAnswer}
          valueQuestion={cardsQuestion}
        />
      </ModalBasic>
      <ModalBasic
        modalName={'Delete card'}
        deleteSave={true}
        handleState={open === 'delete-card'}
        handleClose={handleClose}
        handleModalFn={deleteCardHandler}
      >
        <DeleteModal name={cardsQuestion} />
      </ModalBasic>
    </>
  )
}
