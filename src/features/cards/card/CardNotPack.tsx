import * as React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Navigate, NavLink } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from 'app/store'
import { PATH } from 'common/components/Routing/pages'
import { CreateCardsTC } from 'features/cards/card/card-reducer'
import s from 'features/cards/card/CardNotPack.module.css'
import { getPacksTC } from 'features/packs/packsReducer'

export const CardNotPack = () => {
  const dispatch = useAppDispatch()
  const getIdPack = useAppSelector<string>(state => state.packs.cardPacks[0]._id)
  const namePack = useAppSelector<string>(state => state.packs.cardPacks[0].name)
  const lengthCards = useAppSelector<any>(state => state.cards.cards.length)
  //исправить, пока что грузится только 1 колода
  const getIdUser = useAppSelector<string>(state => state.profile._id)

  const packsListHandler = () => {
    dispatch(getPacksTC({ params: { user_id: getIdUser } }))
    //пока что переход только на мои паки
  }
  const postCardHandler = () => {
    dispatch(
      CreateCardsTC({
        card: {
          answer: '123',
          question: '1235555',
          cardsPack_id: getIdPack,
        },
      })
    )
  }

  if (lengthCards > 0) {
    console.log(lengthCards, 'lengthCards')

    return <Navigate to={PATH.CARD} />
  }

  return (
    <>
      <CssBaseline />
      <Box sx={{ m: 1, width: '50ch', marginLeft: 17 }}>
        <NavLink className={s.backContainer} to={PATH.PACKS} onClick={packsListHandler}>
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
        {namePack}
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
            <Grid item>{`This pack is empty. Click add new card to fill this pack `}</Grid>
          </Grid>
          <Grid container flexDirection={'column'} alignItems={'center'} marginBottom={'49px'}>
            <Button
              variant="contained"
              sx={{
                borderRadius: '20px',
                minWidth: '115px',
                fontSize: '16px',
                lineHeight: '20px',
                fontFamily: 'Montserrat, sans-serif',
                fontStyle: 'Medium',
                textTransform: 'none',
              }}
            >
              <a href={PATH.HASH + PATH.CARD} onClick={postCardHandler}>
                Add new card
              </a>
            </Button>
          </Grid>
        </Box>
      </Box>
    </>
  )
}
