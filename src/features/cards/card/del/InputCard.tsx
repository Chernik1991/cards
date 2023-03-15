import * as React from 'react'
import { useState } from 'react'

import SuperEditableSpanCard from 'features/cards/card/del/SuperEditableSpanCard'

type InputCardPropsType = {
  id: string
  question: string
  callBack: (id: string, title: string) => void
}
export const InputCard = (props: InputCardPropsType) => {
  console.log('InputCard')
  const [value, setValue] = useState<string>('')

  props.callBack(props.id, value)

  return (
    <SuperEditableSpanCard
      id={props.id}
      value={value}
      onChangeText={setValue}
      spanProps={{
        id: props.id,
        defaultText: props.question,
      }}
    />
  )
}
