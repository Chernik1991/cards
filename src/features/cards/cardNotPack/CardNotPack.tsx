import * as React from 'react'

import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Navigate, NavLink } from 'react-router-dom'

import s from 'features/cards/cardNotPack/CardNotPack.module.css'
import { CreateCardsTC } from 'features/cards/cards-reducer'
import * as cardsSelectors from 'features/cards/selectorCard'
import { PATH } from 'routes/pages'
import { useAppDispatch, useAppSelector } from 'store/store'

export const CardNotPack = () => {
  const dispatch = useAppDispatch()
  const cardsPack_id = useAppSelector(cardsSelectors.cardsPack_id)
  const packName = useAppSelector(cardsSelectors.packName)
  const cardsLength = useAppSelector(cardsSelectors.cardsLength)
  const NoCards = `This pack is empty. Click add new card to fill this pack `
  //TODO
  //сделать модалку на дабавление карточки
  const postCardHandler = () => {
    dispatch(
      CreateCardsTC({
        answer: 'CreateCardsTC',
        question: 'CardNotPack',
        cardsPack_id: cardsPack_id,
      })
    )
  }

  if (cardsLength > 0) {
    return <Navigate to={PATH.CARD} />
  }

  return (
    <>
      <CssBaseline />
      <Box sx={{ m: 1, width: '50ch', marginLeft: 17 }}>
        <NavLink className={s.backContainer} to={PATH.PACKS}>
          <svg className={s.backArrow} viewBox="0 0 512 512">
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z" />
          </svg>
          <span> Back to Packs List</span>
        </NavLink>
      </Box>
      <Typography
        component="h1"
        variant="h5"
        fontWeight={'bold'}
        padding={'29px'}
        alignItems={'start'}
        marginLeft={'120px'}
      >
        {packName}
      </Typography>

      <Box
        sx={{
          marginTop: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{ m: 1, width: '50ch', marginTop: 8 }}>
          <Grid container flexDirection={'column'} alignItems={'center'} marginBottom={'49px'}>
            <Grid item>{NoCards}</Grid>
          </Grid>
          <Grid container flexDirection={'column'} alignItems={'center'} marginBottom={'49px'}>
            <NavLink className={s.newPackButton} to={PATH.HASH + PATH.CARD} onClick={postCardHandler}>
              Add new card
            </NavLink>
          </Grid>
        </Box>
      </Box>
    </>
  )
}
