import React, { useState, useCallback } from 'react'
import { withPrefix } from 'gatsby'
import theme from 'theme'

const Image = ({ min = true, trace = true, src = '', alt = '', ...props }) => (
  <span css={[props.css, Image.styles.element]}>
    <FadeInImage
      {...props}
      src={withPrefix(`${min ? src.replace(/^\/forestry/, '/cdn').replace(/\.(png|jpe?g)$/i, match => match.toLowerCase()) : src}`)}
      alt={alt}
      css={Image.styles.image}
    />
    {trace && (
      <FadeInImage
        {...props}
        src={withPrefix(`${src.replace(/^\/forestry/, '/cdn').replace(/\.(png|jpe?g)$/i, '.svg')}`)}
        alt={alt}
        css={Image.styles.trace}
      />
    )}
  </span>
)

Image.styles = {
  element: {
    position: 'relative',
    display: 'flex',
    height: '100%',
    width: '100%',
    zIndex: 0,
  },
  trace: {
    zIndex: -1,
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    backgroundColor: theme.colors.silver,
    transition: 'opacity ease-in-out 400ms',
  },
  image: {
    height: '100%',
    width: '100%',
    transition: 'opacity ease-in-out 400ms 800ms',
  },
}

const FadeInImage = ({ ...props }) => {
  const [ready, setReady] = useState(false)

  const ref = useCallback(node => {
    if (!ready && node !== null && node.complete) {
      setReady(true)
    }
  }, [])

  return (
    <img
      {...props}
      ref={ref}
      onLoad={() => setReady(true)}
      onError={() => setReady(true)}
      onAbort={() => setReady(true)}
      style={{ opacity: ready ? 1 : 0 }}
  />
  )
}

export default Image
