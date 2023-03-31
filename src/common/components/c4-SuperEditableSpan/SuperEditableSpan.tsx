import React, { DetailedHTMLProps, HTMLAttributes, InputHTMLAttributes, useState } from 'react'

import SuperInputText from '../c1-SuperInputText/SuperInputText'

import editIcon from './editIcon.svg'
import s from './SuperEditableSpan.module.css'

import { setAppErrorAC } from 'app/app-reducer'
import { editedModeAC, setNewCurrnetNameAC, setNewNameAC } from 'features/profile/reducerProfile'
import { useAppDispatch } from 'store/store'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

type SuperEditableSpanType = Omit<DefaultInputPropsType, 'type'> & {
  onChangeText?: (value: string) => void
  onEnter?: () => void
  error?: string
  defaultInputClassName?: string

  spanProps?: DefaultSpanPropsType & {
    defaultText?: string
  }
}

const SuperEditableSpan: React.FC<SuperEditableSpanType> = ({
  autoFocus,
  onBlur,
  onEnter,
  spanProps,
  defaultInputClassName,

  ...restProps
}) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const { children, onDoubleClick, className, defaultText, ...restSpanProps } = spanProps || {}

  const onEnterCallback = () => {
    setEditMode(false)
    dispatch(editedModeAC(false))

    onEnter?.()
  }
  const onBlurCallback = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.relatedTarget?.id === 'userEditNickName') {
      const newName = e.currentTarget.value as string

      if (newName.trim()) {
        if (newName.trim().split('').length < 40) {
          dispatch(setNewNameAC(newName))
          dispatch(editedModeAC(false))

          return setEditMode(false)
        } else {
          dispatch(setNewCurrnetNameAC(e.currentTarget.name))
          dispatch(setAppErrorAC("name can't be more 40 symbols"))
          dispatch(editedModeAC(false))

          return setEditMode(false)
        }
      }

      setEditMode(false)
      dispatch(setNewCurrnetNameAC(e.currentTarget.name))
      dispatch(setAppErrorAC("name can't be empty"))

      return dispatch(editedModeAC(false))
    } else {
      dispatch(setNewCurrnetNameAC(defaultText as string))
      dispatch(editedModeAC(false))

      setEditMode(false)
    }
    onBlur?.(e)
  }
  const onDoubleClickCallBack = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    dispatch(setNewCurrnetNameAC(defaultText as string))
    setEditMode(true)
    dispatch(editedModeAC(true))
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
          {...restProps}
        />
      ) : (
        <div className={s.spanBlock}>
          <span onDoubleClick={onDoubleClickCallBack} className={spanClassName} {...restSpanProps}>
            {children || restProps.value || defaultText}
          </span>
          <img src={editIcon} className={s.pen} alt={'edit'} />
        </div>
      )}
    </>
  )
}

export default SuperEditableSpan
