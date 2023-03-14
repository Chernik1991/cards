import * as React from 'react'

import { Avatar } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useFormik } from 'formik'
import { Navigate } from 'react-router-dom'

import { setForgotTC } from './forgotPassword-reducer'

import { useAppDispatch, useAppSelector } from 'app/store'
import { PATH } from 'common/components/Routing/pages'

const theme = createTheme()

type FormikErrorType = {
  email?: string
  from?: string
  message?: string
}
export const ForgotPassword = () => {
  console.log('ForgotPassword')
  const dispatch = useAppDispatch()
  const forgotPassword = useAppSelector<boolean>(state => state.forgot.forgotPassword)
  const formik = useFormik({
    validate: (values: FormikErrorType) => {
      const errors: FormikErrorType = {}

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }

      return errors
    },
    initialValues: {
      email: '',
      from: 'cards <!--<chernik1991.github.io/cards/>-->',
      message: `<div style="background-color: brown; padding: 15px">
password recovery link: 
<a href="https://chernik1991.github.io/cards/#/create-new-password/$token$">
link</a>
</div>`,
    },
    onSubmit: values => {
      dispatch(setForgotTC(values))
    },
  })

  if (forgotPassword) {
    return <Navigate to={PATH.CHECK_EMAIL} />
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
            Forgot your password?
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{
              m: 1,
              width: '50ch',
            }}
          >
            <TextField
              margin="normal"
              required //посмотреть убрать
              fullWidth //посмотреть убрать
              id="email"
              label="Email Address"
              autoComplete="email" //посмотреть убрать
              autoFocus //посмотреть убрать
              {...formik.getFieldProps('email')}
              helperText={
                formik.touched.email && formik.errors.email ? (
                  <div style={{ color: 'red' }}>{formik.errors.email}</div>
                ) : (
                  ' '
                )
              }
            />
            <Grid container>
              <Grid item xs></Grid>
              <Grid container flexDirection={'column'} alignItems={'center'}>
                <Grid item>{'Enter your email address and we will send you further instructions '}</Grid>
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Send instructions
            </Button>
            <Grid container flexDirection={'column'} alignItems={'center'}>
              <Grid item>{'Did you remember your password?'}</Grid>
            </Grid>
            <Grid container flexDirection={'column'} alignItems={'center'}>
              <Grid item>
                <Link href={PATH.HASH + PATH.LOGIN} variant="body2">
                  {'Try logging in'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
