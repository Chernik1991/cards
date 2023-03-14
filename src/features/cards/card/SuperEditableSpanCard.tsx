import React, { DetailedHTMLProps, HTMLAttributes, InputHTMLAttributes, useState } from 'react'

import s from './SuperInputText.module.css'

// import editIcon from './editIcon.svg'
import SuperInputTextCard from 'features/cards/card/SuperInputTextCard'

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

  spanProps?: DefaultSpanPropsType & { defaultText?: string } // пропсы для спана
}

const SuperEditableSpanCard: React.FC<SuperEditableSpanType> = ({
  autoFocus,
  onBlur,
  onEnter,
  spanProps,

  ...restProps // все остальные пропсы попадут в объект restProps
}) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const { children, onDoubleClick, className, defaultText, ...restSpanProps } = spanProps || {}

  const onEnterCallback = () => {
    setEditMode(false)
    // выключить editMode при нажатии Enter // делают студенты

    onEnter?.()
  }
  const onBlurCallback = (e: React.FocusEvent<HTMLInputElement>) => {
    setEditMode(false)
    // выключить editMode при нажатии за пределами инпута // делают студенты

    onBlur?.(e)
  }
  const onDoubleClickCallBack = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    setEditMode(true)
    // включить editMode при двойном клике // делают студенты

    onDoubleClick?.(e)
  }

  const spanClassName = s.span + (className ? ' ' + className : '')

  return (
    <>
      {editMode ? (
        <SuperInputTextCard
          autoFocus={autoFocus || true}
          onBlur={onBlurCallback}
          onEnter={onEnterCallback}
          className={s.input}
          {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
        />
      ) : (
        <div className={s.spanBlock}>
          {/*<img*/}
          {/*  src={editIcon}*/}
          {/*  className={s.pen}*/}
          {/*  alt={'edit'}*/}
          {/*/>*/}
          <span onDoubleClick={onDoubleClickCallBack} className={spanClassName} {...restSpanProps}>
            {/*если нет захардкодженного текста для спана, то значение инпута*/}

            {children || restProps.value || defaultText}
          </span>
        </div>
      )}
    </>
  )
}

export default SuperEditableSpanCard
