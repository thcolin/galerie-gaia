import React, { useState, useCallback } from 'react'
import { withPrefix } from 'gatsby'
import theme from 'theme'

const Image = ({ min = true, trace = true, src = '', alt = '', ...props }) => {
  const [ready, setReady] = useState(false)
  const ref = useCallback(node => {
    if (!ready && node !== null && node.complete) {
      setReady(true)
    }
  }, [])

  return (
    <span css={[props.css, Image.styles.element]}>
      <img
        {...props}
        ref={ref}
        css={Image.styles.image}
        src={withPrefix(`${min ? src.replace(/^\/forestry/, '/cdn').replace(/\.(png|jpe?g)$/i, match => match.toLowerCase()) : src}`)}
        alt={alt}
        onLoad={() => setReady(true)}
        onError={() => setReady(true)}
        onAbort={() => setReady(true)}
        style={{
          opacity: ready ? 1 : 0,
        }}
      />
      {trace && (
        <img
          {...props}
          css={Image.styles.trace}
          src={withPrefix(`${src.replace(/^\/forestry/, '/cdn').replace(/\.(png|jpe?g)$/i, '.svg')}`)}
        />
      )}
    </span>
  )
}

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
  },
  image: {
    height: '100%',
    width: '100%',
    transition: 'opacity ease-in-out 400ms',
  },
}

export default Image
