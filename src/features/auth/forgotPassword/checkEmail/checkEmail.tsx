import * as React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import checkEmail from 'assets/img/icons/checkEmail.svg'
import { emailAuth } from 'features/auth/selectorAuth'
import s from 'header/HeaderStyles.module.css'
import { PATH } from 'routes/pages'
import { useAppSelector } from 'store/store'

const theme = createTheme()

export const CheckEmail = () => {
  const email = useAppSelector(emailAuth)

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
            <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2, borderRadius: '20px' }}>
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
