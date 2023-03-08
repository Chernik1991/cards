import React from 'react'

import { Button } from '@mui/material'

import itINC from '../../assets/img/icons/itINC.svg'

import s from './HeaderStyles.module.css'

export const Header = () => {
  return (
    <div>
      <div className={s.headerBlock}>
        <img alt={'IMG'} src={itINC} />

        <Button
          variant="contained"
          sx={{
            borderRadius: '20px',
            minWidth: '115px',
            fontSize: '16px',
            lineHeight: '20px',
            fontFamily: 'Montserrat, sans-serif',
            fontStyle: 'Medium',
            textTransform: 'none',
          }}
        >
          <a className={s.headerA} href={'/login'}>
            Sign In
          </a>
        </Button>
      </div>
    </div>
  )
}
