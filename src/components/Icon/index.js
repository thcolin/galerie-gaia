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
import Certificate from './Certificate'
import Advise from './Advise'
import Camera from './Camera'
import Happy from './Happy'
import Delivery from './Delivery'
import Lock from './Lock'
import Phone from './Phone'
import Palette from './Palette'

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
  certificate: Certificate,
  advise: Advise,
  camera: Camera,
  happy: Happy,
  delivery: Delivery,
  lock: Lock,
  phone: Phone,
  palette: Palette,
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
