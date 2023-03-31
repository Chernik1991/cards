import React, { useState } from 'react'

import { ModalBasic } from 'common/components/c11-SuperModal/ModalBasic'
import {
  cardAnswerAC,
  cardAnswerImgAC,
  cardQuestionAC,
  cardQuestionImgAC,
  CreateCardsTC,
  DeleteCardsTC,
  setPackNameAC,
  setPrivatePackAC,
  UpdateCardsTC,
} from 'features/cards/cards-reducer'
import * as cardsSelectors from 'features/cards/selectorCard'
import { DeleteModal } from 'features/modals/DeleteModal/DeleteModal'
import { EditCard } from 'features/modals/EditCard/EditCard'
import { EditPack } from 'features/modals/EditPack/EditPack'
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
  const cardsAnswer = useAppSelector(cardsSelectors.cardAnswer)
  const cardsQuestionImg = useAppSelector(cardsSelectors.cardQuestionImg)
  const cardsAnswerImg = useAppSelector(cardsSelectors.cardAnswerImg)
  const card_id = useAppSelector(cardsSelectors.card_id)
  const [error, setError] = useState(false)
  const [errorQuestion, SetErrorQuestion] = useState(false)
  const [errorAnswer, SetErrorAnswer] = useState(false)
  const handleClose = () => {
    setOpen('false')
  }

  const addNewPack = () => {
    if (packName === '') {
      setError(true)
      setTimeout(() => setError(false), 3000)
    }
    if (packName) {
      dispatch(
        addPackTC({
          name: packName,
          // deckCover: packsAdditionalSettings.deckCover,
          private: packPrivate,
        })
      )
      dispatch(setPackNameAC(''))
      dispatch(setPrivatePackAC(false))
      handleClose()
    }
  }
  const updatePack = () => {
    if (packName === '') {
      setError(true)
      setTimeout(() => setError(false), 3000)
    }
    if (packName) {
      dispatch(
        updatePackTC({
          _id: cardsPack_id,
          name: packName,
          private: packPrivate,
        })
      )
      handleClose()
    }
  }
  const deletePack = () => {
    dispatch(deletePackTC(cardsPack_id))
    handleClose()
  }
  const addNewCardHandler = () => {
    // if (cardsAnswer === '' || cardsAnswerImg === '') {
    //   SetErrorAnswer(true)
    //   setTimeout(() => SetErrorAnswer(false), 3000)
    // }
    // if (cardsQuestion === '' || cardsQuestionImg === '') {
    //   SetErrorQuestion(true)
    //   setTimeout(() => SetErrorQuestion(false), 3000)
    // }
    // if ((cardsAnswer && cardsQuestion) || (cardsAnswerImg && cardsQuestionImg)) {
    dispatch(
      CreateCardsTC({
        answer: cardsAnswer,
        question: cardsQuestion,
        cardsPack_id,
        answerImg: cardsAnswerImg,
        questionImg: cardsQuestionImg,
      })
    )
    dispatch(cardQuestionAC(''))
    dispatch(cardAnswerAC(''))
    dispatch(cardQuestionImgAC(''))
    dispatch(cardAnswerImgAC(''))
    handleClose()
    // }
  }
  const editCardHandler = () => {
    // if (cardsAnswer === '' || cardsAnswerImg === '') {
    //   SetErrorAnswer(true)
    //   setTimeout(() => SetErrorAnswer(false), 3000)
    // }
    // if (cardsQuestion === '' || cardsQuestionImg === '') {
    //   SetErrorQuestion(true)
    //   setTimeout(() => SetErrorQuestion(false), 3000)
    // }
    // if ((cardsAnswer && cardsQuestion) || (cardsAnswerImg && cardsQuestionImg)) {
    dispatch(
      UpdateCardsTC({
        answer: cardsAnswer,
        question: cardsQuestion,
        _id: card_id,
        answerImg: cardsAnswerImg,
        questionImg: cardsQuestionImg,
      })
    )
    handleClose()
    // }
  }
  const deleteCardHandler = () => {
    dispatch(
      DeleteCardsTC({
        id: card_id,
        cardsPack_id,
      })
    )
    handleClose()
  }
  const setQuestionImage = (image: string) => {
    cardQuestionImgAC(image)
  }
  const setAnswerImage = (image: string) => {
    cardAnswerImgAC(image)
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
          id={'edit-pack'}
          packStatus={packPrivate}
          packName={packName}
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
        <EditCard
          valueAnswer={cardsAnswer}
          valueQuestion={cardsQuestion}
          valueQuestionImg={cardsQuestionImg}
          valueAnswerImg={cardsAnswerImg}
          setQuestionImage={setQuestionImage}
          setAnswerImage={setAnswerImage}
          errorQuestion={
            errorQuestion ? (
              <span style={{ fontSize: '10px', position: 'relative', top: '55px' }}>Question required</span>
            ) : (
              ''
            )
          }
          errorAnswer={
            errorAnswer ? (
              <span style={{ fontSize: '10px', position: 'relative', top: '55px' }}>Answer required</span>
            ) : (
              ''
            )
          }
        />
      </ModalBasic>
      <ModalBasic
        modalName={'Edit card'}
        deleteSave={false}
        handleState={open === 'edit-card'}
        handleClose={handleClose}
        handleModalFn={editCardHandler}
      >
        <EditCard
          valueAnswer={cardsAnswer}
          valueQuestion={cardsQuestion}
          valueQuestionImg={cardsQuestionImg}
          valueAnswerImg={cardsAnswerImg}
          setQuestionImage={setQuestionImage}
          setAnswerImage={setAnswerImage}
          errorQuestion={
            errorQuestion ? (
              <span style={{ fontSize: '10px', position: 'relative', top: '55px' }}>Question required</span>
            ) : (
              ''
            )
          }
          errorAnswer={
            errorAnswer ? (
              <span style={{ fontSize: '10px', position: 'relative', top: '55px' }}>Answer required</span>
            ) : (
              ''
            )
          }
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
