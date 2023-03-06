import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

import s from './SuperButton.module.css'

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
  xType?: string
}

const SuperButton: React.FC<SuperButtonPropsType> = ({
  xType,
  className,
  disabled,
  ...restProps // все остальные пропсы попадут в объект restProps, там же будет children.
}) => {
  const ternarySecondDefaylt = xType === 'secondary' ? ' ' + s.secondary : ' ' + s.default
  const ternaryRed = xType === 'red' ? ' ' + s.red : ternarySecondDefaylt
  const xTypeColor = disabled ? ' ' + s.disabled : ternaryRed

  const finalClassName = s.button + xTypeColor + (className ? ' ' + className : '')
  // задачка на смешивание классов

  // const finalSpanClassName = s.error
  //     + (spanClassName ? ' ' + spanClassName : '')
  // const finalInputClassName = s.input
  //     + (error ? ' ' + s.errorInput : ' ' + s.superInput)
  //     + (className ? ' ' + s.className : '') // задача на смешивание классов

  return (
    <button
      disabled={disabled}
      className={finalClassName}
      {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
    />
  )
}

export default SuperButton
