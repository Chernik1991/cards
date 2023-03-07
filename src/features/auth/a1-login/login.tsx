import * as React from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Avatar,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useFormik } from 'formik'
import { Navigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from 'app/store'
import { loginTC } from 'features/auth/a1-login/auth-reducer'

const theme = createTheme()

type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}
export const Login = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const formik: any = useFormik({
    validate: (values: FormikErrorType) => {
      const errors: FormikErrorType = {}

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 3) {
        errors.password = 'Must be mo 3 characters or less'
      }

      return errors
    },
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    onSubmit: values => {
      dispatch(loginTC(values))
      //
      // alert(JSON.stringify(values, null, 2)), //убрать потом
      formik.resetForm()
    },
  })

  // const navigate = useNavigate()
  //
  // const redik = true
  //
  // if (redik) {
  //   return navigate('/')
  // }
  if (isLoggedIn) {
    return <Navigate to={'/'} />
  }
  const [Password, setPassword] = React.useState(false)

  const handleClickShowPassword = () => setPassword(show => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
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
            Sign in
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
            <FormControl sx={{ width: '50ch' }} variant={'outlined'}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                variant="filled"
                required
                fullWidth
                margin="normal"
                autoComplete="current-password"
                type={Password ? 'text' : 'password'}
                aria-describedby="component-error-text"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {Password ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label={'password'}
                {...formik.getFieldProps('password')}
              />
              <FormHelperText id="component-error-text">
                {formik.touched.password && formik.errors.password ? (
                  <div style={{ color: 'red' }}>{formik.errors.password}</div>
                ) : (
                  ' '
                )}
              </FormHelperText>
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox {...formik.getFieldProps('rememberMe')} checked={formik.values.rememberMe} color="primary" />
              }
              label="Remember me"
            />
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container flexDirection={'column'} alignItems={'center'}>
              <Grid item>{'Already have an account?'}</Grid>
            </Grid>
            <Grid container flexDirection={'column'} alignItems={'center'}>
              <Grid item>
                <Link href="#" variant="body2">
                  {'Sign Up'}
                </Link>
              </Grid>
            </Grid>
          </Box>
          {/*<Copyright sx={{ mt: 8, mb: 4 }} />*/}
        </Box>
      </Container>
    </ThemeProvider>
  )
}
