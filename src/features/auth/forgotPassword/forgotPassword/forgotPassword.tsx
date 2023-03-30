import * as React from 'react'

import { Avatar } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'

import { sxForgotPassword } from 'common/constans/constans'
import { setForgotTC } from 'features/auth/forgotPassword/forgotPassword/forgotPassword-reducer'
import * as authSelectors from 'features/auth/selectorAuth'
import { PATH } from 'routes/pages'
import { useAppDispatch, useAppSelector } from 'store/store'

const theme = createTheme()

type FormikErrorType = {
  email?: string
  from?: string
  message?: string
}
export const ForgotPassword = () => {
  //TODO
  //поменять письмо на почту

  const dispatch = useAppDispatch()
  const forgotPassword = useAppSelector(authSelectors.forgotPassword)
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
    return <Navigate to={PATH.CHECK_EMAIL} replace />
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={sxForgotPassword}>
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
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email ? (
              <div style={{ color: 'red', paddingTop: 10, paddingBottom: 10 }}>{formik.errors.email}</div>
            ) : (
              <div style={{ padding: 20 }}>{''}</div>
            )}
            <Grid container>
              <Grid item xs></Grid>
              <Grid container flexDirection={'column'} alignItems={'center'}>
                <Grid item>{'Enter your email address and we will send you further instructions '}</Grid>
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, borderRadius: '20px' }}>
              Send instructions
            </Button>
            <Grid container flexDirection={'column'} alignItems={'center'}>
              <Grid item>{'Did you remember your password?'}</Grid>
            </Grid>
            <Grid container flexDirection={'column'} alignItems={'center'}>
              <Grid item>
                <NavLink to={PATH.LOGIN} replace>
                  {'Try logging in'}
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
