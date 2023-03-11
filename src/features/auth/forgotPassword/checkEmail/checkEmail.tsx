import * as React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import { useAppSelector } from 'app/store'
import checkEmail from 'assets/img/icons/checkEmail.svg'
import s from 'common/components/header/HeaderStyles.module.css'
import { PATH } from 'common/components/Routing/pages'

const theme = createTheme()

export const CheckEmail = () => {
  // const dispatch = useAppDispatch()
  // const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const email = useAppSelector<string>(state => state.forgot.email)

  const buttonToLogin = () => {
    alert(123)
    //
    // return redirect('/')
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" fontWeight={'bold'} padding={'29px'}>
            Check Email
          </Typography>
          <img alt={'IMG'} src={checkEmail} />
          <Box sx={{ m: 1, width: '50ch', marginTop: 8 }}>
            <Grid container flexDirection={'column'} alignItems={'center'} marginBottom={'49px'}>
              <Grid item>{`We’ve sent an Email with instructions to ${email}`}</Grid>
            </Grid>
            <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              <a className={s.headerA} href={PATH.HASH + PATH.LOGIN}>
                Back to login
              </a>
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
