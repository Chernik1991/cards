import * as React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { NavLink } from 'react-router-dom'

import checkEmail from 'assets/img/icons/checkEmail.svg'
import { sxCheckEmail } from 'common/constans/constans'
import * as authSelectors from 'features/auth/selectorAuth'
import s from 'header/HeaderStyles.module.css'
import { PATH } from 'routes/pages'
import { useAppSelector } from 'store/store'

const theme = createTheme()

export const CheckEmail = () => {
  const email = useAppSelector(authSelectors.email)

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={sxCheckEmail}>
          <Typography component="h1" variant="h5" fontWeight={'bold'} padding={'29px'}>
            Check Email
          </Typography>
          <img alt={'IMG'} src={checkEmail} />
          <Box sx={{ m: 1, width: '50ch', marginTop: 8 }}>
            <Grid container flexDirection={'column'} alignItems={'center'} marginBottom={'49px'}>
              <Grid item>{`We’ve sent an Email with instructions to ${email}`}</Grid>
            </Grid>
            <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2, borderRadius: '20px' }}>
              <NavLink className={s.headerA} to={PATH.LOGIN}>
                Back to login
              </NavLink>
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
