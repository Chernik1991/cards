import React from 'react'

import { VisibilityOff, Visibility } from '@mui/icons-material'
import { Button, FormControl, FormGroup, FormLabel, Grid, IconButton, InputAdornment, InputLabel } from '@mui/material'
import Input from '@mui/material/Input'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { AppRootStateType, useAppDispatch } from '../../../app/store'
import { PATH } from '../../../common/components/Routing/pages'
import { ErrorSnackbar } from '../../../common/utils/ErrorSnackbar'

import { registerTC } from './register-reducer'

type FormikErrorType = {
  email?: string
  password?: string
}

export const Register = () => {
  const dispatch = useAppDispatch()

  const isRegister = useSelector<AppRootStateType, boolean>(state => state.reg.isRegister)

  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }

      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length > 15) {
        errors.password = 'Must be 15 characters or less'
      }

      return errors
    },
    onSubmit: values => {
      dispatch(registerTC(values))
      formik.resetForm()
    },
  })

  console.log(isRegister)
  if (isRegister) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'}>
        <FormControl>
          <FormLabel>Sign up</FormLabel>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
                <Input id="standard-adornment-Email" type="text" {...formik.getFieldProps('email')} />
              </FormControl>

              {formik.touched.email && formik.errors.email ? (
                <div style={{ color: 'red' }}>{formik.errors.email}</div>
              ) : null}

              <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  {...formik.getFieldProps('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              {formik.touched.password && formik.errors.password ? (
                <div style={{ color: 'red' }}>{formik.errors.password}</div>
              ) : null}

              <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">Confirm password</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  {...formik.getFieldProps('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              {formik.touched.password && formik.errors.password ? (
                <div style={{ color: 'red' }}>{formik.errors.password}</div>
              ) : null}

              <Button type={'submit'} variant={'contained'} color={'primary'}>
                Sign up
              </Button>
            </FormGroup>
          </form>
        </FormControl>
        <ErrorSnackbar />
      </Grid>
    </Grid>
  )
}
