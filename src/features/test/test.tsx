import React from 'react'

import SuperInputText from 'common/components/c1-SuperInputText/SuperInputText'
import SuperButton from 'common/components/c2-SuperButton/SuperButton'
import SuperCheckbox from 'common/components/c3-SuperCheckbox/SuperCheckbox'
import SuperEditableSpan from 'common/components/c4-SuperEditableSpan/SuperEditableSpan'
import SuperSelect from 'common/components/c5-SuperSelect/SuperSelect'
import SuperRadio from 'common/components/c6-SuperRadio/SuperRadio'
import SuperRange from 'common/components/c7-SuperRange/SuperRange'
import SuperDebouncedInput from 'common/components/c8-SuperDebouncedInput/SuperDebouncedInput'

export const Test = () => {
  return (
    <div>
      test
      <SuperInputText />
      <SuperButton />
      <SuperCheckbox />
      <SuperEditableSpan />
      <SuperSelect />
      <SuperRadio />
      <SuperRange />
      <SuperDebouncedInput />
      {/*<SuperPagination/>*/}
      {/*<SuperSort/>*/}
    </div>
  )
}
