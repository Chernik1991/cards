import React, { DetailedHTMLProps, HTMLAttributes, InputHTMLAttributes, useState } from 'react'

import SuperInputText from '../c1-SuperInputText/SuperInputText'

import editIcon from './editIcon.svg'
import s from './SuperEditableSpan.module.css'

import { useAppDispatch } from 'app/store'
import { editedModeAC, setNewCurrnetNameAC, setNewNameAC, updateUserDataTC } from 'features/profile/reducerProfile'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
// тип пропсов обычного спана
type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута, кроме type
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperEditableSpanType = Omit<DefaultInputPropsType, 'type'> & {
  // и + ещё пропсы которых нет в стандартном инпуте
  onChangeText?: (value: string) => void
  onEnter?: () => void
  error?: string
  defaultInputClassName?: string

  spanProps?: DefaultSpanPropsType & {
    defaultText?: string
  } // пропсы для спана
}

const SuperEditableSpan: React.FC<SuperEditableSpanType> = ({
  autoFocus,
  onBlur,
  onEnter,
  spanProps,
  defaultInputClassName,

  ...restProps // все остальные пропсы попадут в объект restProps
}) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const { children, onDoubleClick, className, defaultText, ...restSpanProps } = spanProps || {}

  const onEnterCallback = () => {
    setEditMode(false)
    dispatch(editedModeAC(false))
    // выключить editMode при нажатии Enter // делают студенты

    onEnter?.()
  }
  const onBlurCallback = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.relatedTarget?.id === 'userEditNickName') {
      const newName = e.currentTarget.value as string

      if (newName.trim()) {
        dispatch(setNewNameAC(newName))
        // noinspection JSIgnoredPromiseFromCall
        dispatch(updateUserDataTC(newName))
        dispatch(editedModeAC(false))
      }

      setEditMode(false)
      dispatch(setNewCurrnetNameAC(e.currentTarget.name))

      return dispatch(editedModeAC(false))
    }
    dispatch(setNewCurrnetNameAC(defaultText as string))
    dispatch(editedModeAC(false))

    setEditMode(false)

    // выключить editMode при нажатии за пределами инпута // делают студенты

    onBlur?.(e)
  }
  const onDoubleClickCallBack = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    dispatch(setNewCurrnetNameAC(defaultText as string))
    setEditMode(true)
    dispatch(editedModeAC(true))
    // включить editMode при двойном клике // делают студенты

    onDoubleClick?.(e)
  }

  const spanClassName = s.span + (className ? ' ' + className : '')
  const inputClassName = s.input + (defaultInputClassName ? ' ' + defaultInputClassName : '')

  return (
    <>
      {editMode ? (
        <SuperInputText
          autoFocus={true}
          onBlur={onBlurCallback}
          onEnter={onEnterCallback}
          className={inputClassName}
          {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
        />
      ) : (
        <div className={s.spanBlock}>
          <span onDoubleClick={onDoubleClickCallBack} className={spanClassName} {...restSpanProps}>
            {/*если нет захардкодженного текста для спана, то значение инпута*/}

            {children || restProps.value || defaultText}
          </span>
          <img src={editIcon} className={s.pen} alt={'edit'} />
        </div>
      )}
    </>
  )
}

export default SuperEditableSpan
