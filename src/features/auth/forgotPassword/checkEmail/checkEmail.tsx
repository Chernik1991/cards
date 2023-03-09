import * as React from 'react'

import { Avatar } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import { ResponseLoginType } from 'api/cards-api'
import { useAppSelector } from 'app/store'

const theme = createTheme()

export const CheckEmail = () => {
  // const dispatch = useAppDispatch()
  // const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const data = useAppSelector<ResponseLoginType>(state => state.profile)

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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 80, height: 80, textAlign: 'center' }}>
            Friday cards
          </Avatar>
          <Typography component="h1" variant="h5" fontWeight={'bold'}>
            Check Email
          </Typography>
          <Avatar
            sx={{
              m: 1,
              bgcolor: 'secondary.main',
              width: 150,
              height: 150,
              textAlign: 'center',
            }}
          >
            MAIL
          </Avatar>
          <Box sx={{ m: 1, width: '50ch' }}>
            <Grid container flexDirection={'column'} alignItems={'center'}>
              <Grid item>{`We’ve sent an Email with instructions to ${data.email}`}</Grid>
            </Grid>
            <Button onClick={buttonToLogin} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Back to login
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
