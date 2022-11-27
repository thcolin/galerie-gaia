import { createContext, useContext, useState, useEffect } from 'react'

const snipcartContext = createContext({})

export const SnipcartProvider = ({ children, ...props }) => {
  const [state, setState] = useState(0)

  useEffect(() => {
    const cb = () => {
      Snipcart.store.subscribe(() => {
        const state = Snipcart.store.getState()
        setState(state.cart.items.count)
      })

      Snipcart.events.on('item.removed', () => {
        try {
          Promise.all(Snipcart.store.getState().cart.items.items.map(item => Snipcart.api.cart.items.update({
            uniqueId: item.uniqueId,
            dimensions: {
              weight: item.dimensions.weight > 1000 ? item.dimensions.weight - 1000 : item.dimensions.weight,
            }
          })))
        } catch (e) {
          console.warn(e)
        }
      })
    }

    typeof Snipcart !== 'undefined' ? cb() : document.addEventListener('snipcart.ready', cb)
  }, [])

  return (
    <snipcartContext.Provider {...props} value={state}>
      {children}
    </snipcartContext.Provider>
  )
}

export const useSnipcartContext = () => useContext(snipcartContext)
