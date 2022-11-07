import { useEffect, useState } from 'react'
import Icon from './Icon'
import theme from '../theme'

const Cart = ({ ...props }) => {
  const [items, setItems] = useState(0)

  useEffect(() => {
    // const unsubscribe = Snipcart.store.subscribe(() => setItems(Snipcart.store.getState().cart.items.count))
    // return unsubscribe
  }, [])

  return (
    <div css={Cart.styles.element}>
      <button css={theme.resets.button} onClick={() => Snipcart.api.theme.cart.open()}>
        <Icon children='cart' />
      </button>
      <span css={Cart.styles.badge} style={{ visibility: items ? 'visible' : 'hidden' }}>{items}</span>
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
