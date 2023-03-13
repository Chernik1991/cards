// noinspection BadExpressionStatementJS

import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, ReactNode } from 'react'

import s from './SuperInputText.module.css'

import { setAppErrorAC } from 'app/app-reducer'
import { useAppDispatch } from 'app/store'
import { setNewCurrnetNameAC, updateUserDataTC } from 'features/profile/reducerProfile'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута, кроме type
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperInputTextPropsType = Omit<DefaultInputPropsType, 'type'> & {
  // и + ещё пропсы которых нет в стандартном инпуте
  onChangeText?: (value: string) => void
  onEnter?: () => void
  error?: ReactNode
  spanClassName?: string
}

const SuperInputText: React.FC<SuperInputTextPropsType> = ({
  onChange,
  onChangeText,
  onKeyPress,
  onEnter,
  error,
  className,
  spanClassName,
  id,

  ...restProps // все остальные пропсы попадут в объект restProps
}) => {
  const dispatch = useAppDispatch()
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e) // если есть пропс onChange, то передать ему е (поскольку onChange не обязателен)
    dispatch(setNewCurrnetNameAC(e.currentTarget.value))
  }

  const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyPress?.(e)

    onEnter && // если есть пропс onEnter
      e.key === 'Enter' && // и если нажата кнопка Enter
      onEnter() // то вызвать его
    if (e.key === 'Enter') {
      if (e.currentTarget.value.trim()) {
        // noinspection JSIgnoredPromiseFromCall
        dispatch(updateUserDataTC(e.currentTarget.value.trim()))
      } else {
        dispatch(setNewCurrnetNameAC(e.currentTarget.name))
        dispatch(setAppErrorAC("name can't be empty"))
      }
    } else {
      ;('')
    }
  }

  const finalSpanClassName = s.error + (spanClassName ? ' ' + spanClassName : '')
  const finalInputClassName =
    s.input + (error ? ' ' + s.errorInput : ' ' + s.superInput) + (className ? ' ' + className : '') // задача на смешивание классов
  // s.input + (error ? ' ' + s.errorInput : ' ' + s.superInput) + (className ? ' ' + s.className : '') // задача на смешивание классов.

  return (
    <div className={s.inputWrapper}>
      <input
        id={id}
        type={'text'}
        onChange={onChangeCallback}
        onKeyDown={onKeyPressCallback}
        className={finalInputClassName}
        {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
      />
      <span id={id ? id + '-span' : undefined} className={finalSpanClassName}>
        {error}
      </span>
    </div>
  )
}

export default SuperInputText
