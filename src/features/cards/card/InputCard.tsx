import SuperEditableSpanCard from 'common/components/del/SuperEditableSpanCard'
import { useState } from 'react'

type InputCardPropsType = {
  id: string
  question: string
  onClick: (id: string, title: string) => void
}
export const InputCard = (props: InputCardPropsType) => {
  console.log('InputCard')
  const [value, setValue] = useState<string>('')

  props.onClick(props.id, value)

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
