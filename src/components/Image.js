import React, { useState, useCallback } from 'react'
import { withPrefix } from 'gatsby'
import theme from 'theme'

const Image = ({ min = true, trace = true, src = '', alt = '', ...props }) => {
  const [ready, setReady] = useState([])

  const original = useCallback(node => {
    if (!ready.includes('original') && node !== null && node.complete) {
      setReady([...ready, 'original'])
    }
  }, [])

  const fallback = useCallback(node => {
    if (!ready.includes('fallback') && node !== null && node.complete) {
      setReady([...ready, 'fallback'])
    }
  }, [])

  return (
    <span css={[props.css, Image.styles.element]}>
      <img
        {...props}
        ref={original}
        src={withPrefix(`${min ? src.replace(/^\/forestry/, '/cdn').replace(/\.(png|jpe?g)$/i, match => match.toLowerCase()) : src}`)}
        alt={alt}
        onLoad={() => setReady([...ready, 'original'])}
        onError={() => setReady([...ready, 'original'])}
        onAbort={() => setReady([...ready, 'original'])}
        css={Image.styles.image}
        style={{
          opacity: ready.includes('original') ? 1 : 0,
        }}
      />
      {trace && (
        <img
          {...props}
          ref={fallback}
          src={withPrefix(`${src.replace(/^\/forestry/, '/cdn').replace(/\.(png|jpe?g)$/i, '.svg')}`)}
          onLoad={() => setReady([...ready, 'fallback'])}
          onError={() => setReady([...ready, 'fallback'])}
          onAbort={() => setReady([...ready, 'fallback'])}
          css={Image.styles.trace}
          style={{
            opacity: ready.includes('fallback') ? 1 : 0,
          }}
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
    transition: 'opacity ease-in-out 400ms',
  },
  image: {
    height: '100%',
    width: '100%',
    transition: 'opacity ease-in-out 400ms 800ms',
  },
}

export default Image
