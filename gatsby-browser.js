/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import { SnipcartProvider } from './src/contexts/Snipcart'

export const onInitialClientRender = () => {
  if ('onGatsbyInitialClientRender' in window && typeof window.onGatsbyInitialClientRender === 'function') {
    window.onGatsbyInitialClientRender()
  }
}

export const onRouteUpdate = () => {
  if ('onGatsbyRouteUpdate' in window && typeof window.onGatsbyRouteUpdate === 'function') {
    window.onGatsbyRouteUpdate()
  }
}

export const wrapRootElement = ({ element }) => (
  <SnipcartProvider>{element}</SnipcartProvider>
)
