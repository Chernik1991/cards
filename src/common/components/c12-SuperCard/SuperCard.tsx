import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { NavLink } from 'react-router-dom'

import e from './SuperCard.module.css'

import { PATH } from 'routes/pages'

type SuperCardType = {
  cardStyle?: string
  menuData: Array<any>
  maxHeight: string
  menuCardHandler: (value: string) => void
}

export const SuperCard = ({ cardStyle, menuData, menuCardHandler, maxHeight }: SuperCardType) => {
  const bull = menuData.map(el => {
    const redirect = el.description === 'Learn' ? PATH.LEARN : ''
    const redirect1 = el.description === 'Profile' ? PATH.PROFILE : ''
    const redirect2 = el.description === 'Log Out' ? PATH.LOGIN : ''

    return (
      <Box
        className={e.option}
        key={crypto.randomUUID()}
        component="span"
        onClick={() => menuCardHandler(el.description)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0px',
          margin: '0px',
          width: '100%',
        }}
      >
        <NavLink to="" className={e.scaledIcon}>
          {el.icon}
        </NavLink>
        <NavLink to={redirect || redirect1 || redirect2} className={e.fixedDesctiprion}>
          {el.description}
        </NavLink>
      </Box>
    )
  })

  return (
    <Card className={cardStyle}>
      <div className={e.arrowUp} />
      <CardContent sx={{ padding: '10px', margin: '0px', maxHeight: maxHeight }}>{bull}</CardContent>
    </Card>
  )
}
