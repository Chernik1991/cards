import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import e from './SuperCard.module.css'

type SuperCardType = {
  cardStyle?: string
  menuData: Array<any>
  // menuCardHandler: (value: string) => void
}

export const SuperCard = ({ cardStyle, menuData }: SuperCardType) => {
  const bull = menuData.map(el => {
    return (
      <Box
        className={e.option}
        key={crypto.randomUUID()}
        component="span"
        // onClick={() => menuCardHandler(el.description)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0px',
          margin: '0px',
          width: '100%',
        }}
      >
        <div className={e.scaledIcon}>{el.icon}</div>
        <div className={e.fixedDesctiprion}>{el.description}</div>
      </Box>
    )
  })

  return (
    <Card className={cardStyle}>
      <div className={e.arrowUp} />
      <CardContent sx={{ padding: '10px', margin: '0px', maxHeight: '120px' }}>{bull}</CardContent>
    </Card>
  )
}
