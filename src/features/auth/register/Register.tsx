import React, { useState } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Box,
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
} from '@mui/material'
import Input from '@mui/material/Input'
import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'

import { registerTC } from './register-reducer'
import s from './RegisterStyle.module.css'

import {
  sxRegisterBox,
  sxRegisterBoxSignIn,
  sxRegisterButtonSingUp,
  sxRegisterFormLabel,
} from 'common/constans/constans'
import { ErrorSnackbar } from 'common/utils/ErrorSnackbar'
import * as authSelectors from 'features/auth/selectorAuth'
import { PATH } from 'routes/pages'
import { useAppDispatch, useAppSelector } from 'store/store'

type FormikErrorType = {
  email?: string
  password?: string
  confirmPassword?: string
}

export const Register = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(authSelectors.isLoggedIn)
  const isRegister = useAppSelector(authSelectors.isRegister)

  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
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
      if (!values.confirmPassword) {
        errors.confirmPassword = 'Required'
      } else if (values.confirmPassword.length > 15) {
        errors.confirmPassword = 'Must be 15 characters or less'
      }
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords must be equal'
        errors.password = 'Passwords must be equal'
      }

      return errors
    },
    onSubmit: values => {
      dispatch(registerTC(values))
    },
  })

  if (isRegister) {
    return <Navigate to={PATH.LOGIN} replace />
  }
  if (isLoggedIn) {
    return <Navigate to={PATH.PROFILE} replace />
  }

  return (
    <div>
      <Grid className={s.RegContainer} container justifyContent={'center'}>
        <Grid className={s.RegFormBox} item justifyContent={'center'}>
          <FormLabel sx={sxRegisterFormLabel}>
            <div>Sign up</div>
          </FormLabel>
          <form onSubmit={formik.handleSubmit}>
            <FormGroup>
              <FormControl sx={{ m: 1, width: '30ch' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-Email">Email</InputLabel>
                <Input id="standard-adornment-Email" type="text" {...formik.getFieldProps('email')} />
              </FormControl>

              {formik.touched.email && formik.errors.email ? (
                <div style={{ color: 'red' }}>{formik.errors.email}</div>
              ) : null}

              <FormControl sx={{ m: 1, width: '30ch' }} variant="standard">
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

              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div style={{ color: 'red' }}>{formik.errors.password}</div>
              ) : null}

              <FormControl sx={{ m: 1, width: '30ch' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-confirm-password">Confirm password</InputLabel>
                <Input
                  id="standard-adornment-confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  {...formik.getFieldProps('confirmPassword')}
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

              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div style={{ color: 'red' }}>{formik.errors.confirmPassword}</div>
              ) : null}

              <Button type={'submit'} variant={'contained'} sx={sxRegisterButtonSingUp}>
                Sign up
              </Button>
              <Box sx={sxRegisterBox}>
                <div>Already have an account?</div>
              </Box>
              <Box sx={sxRegisterBoxSignIn}>
                <NavLink to={PATH.LOGIN} replace>
                  Sign In
                </NavLink>
              </Box>
            </FormGroup>
          </form>
        </Grid>
      </Grid>

      <ErrorSnackbar />
    </div>
  )
}
