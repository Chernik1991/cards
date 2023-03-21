import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react'

import s from './SuperCheckbox.module.css'

import { updateUserPackPrivateAC } from 'features/packs/modals/modalsReducer'
import { useAppDispatch } from 'store/store'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperCheckboxPropsType = Omit<DefaultInputPropsType, 'type'> & {
  onChangeChecked?: (checked: boolean) => void
  spanClassName?: string
}

const SuperCheckbox: React.FC<SuperCheckboxPropsType> = ({
  onChange,
  onChangeChecked,
  className,
  spanClassName,
  children, // в эту переменную попадёт текст, типизировать не нужно так как он затипизирован в React.FC
  id,

  ...restProps // все остальные пропсы попадут в объект restProps
}) => {
  const dispatch = useAppDispatch()
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.id === 'AddNewPackCheckbox') {
      dispatch(updateUserPackPrivateAC(e.currentTarget.checked as boolean))
    }
    if (e.currentTarget.id === 'EditPackCheckbox') {
      dispatch(updateUserPackPrivateAC(e.currentTarget.checked as boolean))
    }
    if (onChangeChecked) {
      onChangeChecked(e.currentTarget.checked)
    }
    if (onChange) {
      onChange(e)
    }
    // задачка на написание онченджа
  }

  const finalInputClassName = s.checkbox + (className ? ' ' + className : '')

  return (
    <label className={s.label}>
      <input
        id={id}
        type={'checkbox'}
        onChange={onChangeCallback}
        className={finalInputClassName}
        {...restProps} // отдаём инпуту остальные пропсы если они есть (checked например там внутри)
      />
      {children && (
        <span id={id ? id + '-span' : undefined} className={s.spanClassName}>
          {children}
        </span>
      )}
    </label> // благодаря label нажатие на спан передастся в инпут
  )
}

export default SuperCheckbox
