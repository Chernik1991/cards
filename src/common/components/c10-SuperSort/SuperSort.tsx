import React from 'react'

import sortDown from './icons8-sort-down.png'
import sortUp from './icons8-sort-up.png'
import sort from './icons8-sort.png'

// добавить в проект иконки и импортировать
const downIcon = sortDown
const upIcon = sortUp
const noneIcon = sort

export type SuperSortPropsType = {
  id?: string
  sort: string
  value: string
  onChange: (newSort: string) => void
}
export const pureChange = (sort: string, down: string, up: string) => {
  // console.log(sort)
  // console.log(down)
  // console.log(up)
  switch (sort) {
    case '': {
      return down
    }
    case up: {
      return ''
    }
    case down: {
      return up
    }
    default:
      return down
  }
  // пишет студент, sort: (click) => down (click) => up (click) => '' (click) => down ...
  // return sort // исправить
}

const SuperSort: React.FC<SuperSortPropsType> = ({ sort, value, onChange, id = 'hw15' }) => {
  const up = '0' + value
  const down = '1' + value

  const onChangeCallback = () => {
    onChange(pureChange(sort, down, up))
  }

  // eslint-disable-next-line no-nested-ternary
  const icon = sort === down ? downIcon : sort === up ? upIcon : noneIcon

  return (
    <span id={id + '-sort-' + value} onClick={onChangeCallback}>
      {/*сделать иконку*/}
      <img id={id + '-icon-' + sort} src={icon} alt={''} />
    </span>
  )
}

export default SuperSort
