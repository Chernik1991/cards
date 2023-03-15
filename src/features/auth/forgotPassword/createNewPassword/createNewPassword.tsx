import * as React from 'react'
import { useState } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useFormik } from 'formik'
import { Navigate, useParams } from 'react-router-dom'

import { setNewPasswordTC } from './newPassword-reducer'

import { useAppDispatch, useAppSelector } from 'app/store'
import { PATH } from 'common/components/Routing/pages'

const theme = createTheme()

type FormikErrorType = {
  password?: string
  resetPasswordToken?: string
}
export const CreateNewPassword = () => {
  const { token } = useParams<{ token: string }>()
  const isSetNewPassword = useAppSelector<boolean>(state => state.pass.isSetNewPassword)
  const dispatch = useAppDispatch()
  // const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const formik = useFormik({
    validate: (values: FormikErrorType) => {
      const errors: FormikErrorType = {}

      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 3) {
        errors.password = 'Must be mo 3 characters or less'
      }

      return errors
    },
    initialValues: {
      password: '',
      resetPasswordToken: `${token?.concat()}`,
    },
    onSubmit: values => {
      dispatch(setNewPasswordTC(values))
    },
  })

  const [Password, setPassword] = useState(false)

  const handleClickShowPassword = () => setPassword(show => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  console.log(isSetNewPassword, '1')
  if (isSetNewPassword) {
    console.log(isSetNewPassword, '2')

    return <Navigate to={PATH.LOGIN} />
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
          <Typography component="h1" variant="h5" fontWeight={'bold'}>
            Create new password
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{
              m: 1,
              width: '50ch',
            }}
          >
            <FormControl sx={{ width: '50ch' }} variant={'outlined'}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                required
                fullWidth
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
            <Grid container flexDirection={'column'} alignItems={'center'}>
              <Grid item>{'Create new password and we will send you further instructions to email'}</Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, borderRadius: '20px' }}>
              Create new password
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
