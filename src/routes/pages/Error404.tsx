import React from 'react'

import error404 from 'routes/pages/404.svg'
import s from 'routes/pages/Error404.module.css'

const Error404 = () => {
  return (
    <div>
      <div className={s.wrapper}>
        <img src={error404} alt={'404'} className={s.error404} />
      </div>
    </div>
  )
}

export default Error404
