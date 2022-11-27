import Icon from './Icon'
import theme from '../theme'
import { useSnipcartContext } from '../contexts/Snipcart'

const Cart = ({ ...props }) => {
  const cart = useSnipcartContext()

  return (
    <div css={Cart.styles.element}>
      <button css={theme.resets.button} onClick={() => Snipcart.api.theme.cart.open()}>
        <Icon children='cart' />
      </button>
      <span css={Cart.styles.badge} style={{ visibility: cart ? 'visible' : 'hidden' }}>{cart}</span>
    </div>
  )
}

Cart.styles = {
  element: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    background: 'red',
    top: '-6px',
    right: '-10px',
    color: 'white',
    padding: '3px 4px 3px 6px',
    fontSize: '10px',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    borderRadius: '10px',
  }
}

export default Cart
