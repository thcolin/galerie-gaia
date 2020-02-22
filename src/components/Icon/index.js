import React from 'react'
import Menu from './Menu'
import Arrow from './Arrow'
import Close from './Close'

const icons = {
  menu: Menu,
  arrow: Arrow,
  close: Close,
}

const Icon = ({ children, ...props }) => {
  const Child = icons[children]

  return (
    <Child {...props} css={[props.css, Icon.styles.element]} />
  )
}

Icon.styles = {
  element: {
    height: '1em',
    width: '1em',
  },
}

export default Icon
