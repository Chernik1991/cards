import React, { DetailedHTMLProps, InputHTMLAttributes, HTMLAttributes, useState } from 'react'

import { useAppDispatch } from '../../../app/store'
import {
  editedModeAC,
  setNewCurrnetNameAC,
  setNewNameAC,
  setTempNameAC,
} from '../../../features/profile/reducerProfile'
import SuperInputText from '../c1-SuperInputText/SuperInputText'

import editIcon from './editIcon.svg'
import s from './SuperEditableSpan.module.css'

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

  spanProps?: DefaultSpanPropsType & {
    defaultText?: string
    defaultInputClassName?: string
  } // пропсы для спана
}

const SuperEditableSpan: React.FC<SuperEditableSpanType> = ({
  autoFocus,
  onBlur,
  onEnter,
  spanProps,

  ...restProps // все остальные пропсы попадут в объект restProps
}) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const {
    children,
    onDoubleClick,
    className,
    defaultText,
    defaultInputClassName,
    ...restSpanProps
  } = spanProps || {}

  const onEnterCallback = () => {
    // dispatch(setTempNameAC(restProps.value as string))
    // dispatch(setNewCurrnetNameAC(defaultText as string))
    setEditMode(false)
    // onEnter && dispatch(setNewNameAC(defaultText as string))
    dispatch(editedModeAC(false))
    // dispatch(setNewCurrnetNameAC(defaultText as string))
    // выключить editMode при нажатии Enter // делают студенты

    onEnter?.()
  }
  const onBlurCallback = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.relatedTarget?.id !== 'userEditNickName') {
      setEditMode(false)
      dispatch(editedModeAC(false))
    }
    console.log(defaultText)
    // dispatch(setTempNameAC(defaultText as string))
    dispatch(editedModeAC(false))
    // onEnter && dispatch(setNewCurrnetNameAC(defaultText as string))
    setEditMode(false)

    // выключить editMode при нажатии за пределами инпута // делают студенты

    onBlur?.(e)
  }
  const onDoubleClickCallBack = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    console.log(defaultText as string)
    setEditMode(true)
    dispatch(editedModeAC(true))
    dispatch(setNewCurrnetNameAC(defaultText as string))
    // включить editMode при двойном клике // делают студенты

    onDoubleClick?.(e)
  }

  const spanClassName = s.span + (className ? ' ' + className : '')
  const spanInputClassName = s.input + (defaultInputClassName ? ' ' + defaultInputClassName : '')

  return (
    <>
      {editMode ? (
        <SuperInputText
          autoFocus={true}
          onBlur={onBlurCallback}
          onEnter={onEnterCallback}
          className={spanInputClassName}
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
