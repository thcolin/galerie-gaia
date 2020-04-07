import React from 'react'
import Menu from './Menu'
import Arrow from './Arrow'
import Close from './Close'
import Instagram from './Instagram'
import Facebook from './Facebook'
import Couch from './Couch'
import Informations from './Informations'
import Send from './Send'
import Check from './Check'
import Loading from './Loading'

const icons = {
  menu: Menu,
  arrow: Arrow,
  close: Close,
  instagram: Instagram,
  facebook: Facebook,
  couch: Couch,
  informations: Informations,
  send: Send,
  check: Check,
  loading: Loading,
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
