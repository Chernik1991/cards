import React from 'react'

import { leftArrow } from 'common/constans/constans'
import s from 'features/profile/Profile.module.css'

export const BackToCardsButton = () => {
  return (
    <div className={s.backContainer}>
      <svg className={s.backArrow} viewBox="0 0 512 512">
        <path d={leftArrow} />
      </svg>
      <span> Back to Cards List</span>
    </div>
  )
}
