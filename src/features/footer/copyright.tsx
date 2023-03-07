import * as React from 'react'

import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

export const Copyright = (props: any) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://chernik1991.github.io/cards/">
        Friday cards
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}
