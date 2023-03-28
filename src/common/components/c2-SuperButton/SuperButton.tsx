import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

import s from './SuperButton.module.css'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
  xType?: string
}

const SuperButton: React.FC<SuperButtonPropsType> = ({ xType, className, disabled, ...restProps }) => {
  const ternarySecondDefaylt = xType === 'secondary' ? ' ' + s.secondary : ' ' + s.default
  const ternaryRed = xType === 'red' ? ' ' + s.red : ternarySecondDefaylt
  const xTypeColor = disabled ? ' ' + s.disabled : ternaryRed

  const finalClassName = s.button + xTypeColor + (className ? ' ' + className : '')

  return (
    <button
      disabled={disabled}
      className={finalClassName}
      {...restProps} //
    />
  )
}

export default SuperButton
