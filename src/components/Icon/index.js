import React from 'react'
import Menu from './Menu'

const icons = {
  menu: Menu,
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
