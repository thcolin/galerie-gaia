import { createContext, useContext, useState, useEffect } from 'react'

const snipcartContext = createContext(0)

export const SnipcartProvider = ({ children, ...props }) => {
  const [state, setState] = useState(0)

  useEffect(() => {
    const cb = () => {
      Snipcart.api.session.setLanguage('fr', {
        "actions": {
          "continue_shopping": "Retour",
          "checkout": "Livraison et paiement",
        },
        "address_form": {
          "address1": "Adresse",
        },
        "header": {
          "title_cart_summary": "Panier",
        },
        "payment": {
          "form": {
            "deferred_payment_title": "Payer plus tard",
            "deferred_payment_instructions": "En passant cette commande vous réservez l'oeuvre pour 48h et vous acceptez de régler celle-ci dans ce délai, par carte, chèque, espèce ou virement.<br/><br/>Si vous avez besoin d'un délai supplémentaire, afin de maintenir votre réservation, contactez-nous au <legend style='font-weight:bold;'>02 40 48 14 91</legend> ou passez en discuter à la galerie au <legend style='display:inline;font-weight:bold;'>4 Rue Fénelon Nantes - Hôtel de Ville - Parking Decré.</legend>",
          },
          "checkout_with": "Payer via",
          "checkout_with_method": "Payer via %{method}",
          "place_order": "Finaliser ma commande",
          "methods": {
            "card": "Carte de crédit",
            "paypal": "PayPal",
            "deferred_payment": "Payer plus tard"
          },
        },
      })

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
      
      Snipcart.api.cart.update({
        customFields: [
          {
            name: 'privacy-policy',
            value: true,
          }
        ]
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
