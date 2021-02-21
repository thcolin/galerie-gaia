import React, { useState, useCallback } from 'react'
// import { withPrefix } from 'gatsby'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import slug from 'slug'
import theme from 'theme'

const withPrefix = (uri) => `https://galerie-gaia.s3.eu-west-3.amazonaws.com${uri}`

const Image = ({ min = true, trace = true, src = '', alt = '', source = 'originals', ...props }) => {
  const dirname = src.split('/').slice(0, -1).join('/')
  const stem = slug(src.split('/').pop().split('.').slice(0, -1).join('.').replace(/°/, 'degree'), { lower: true })
  const extname = `.${src.split('.').pop().toLocaleLowerCase()}`

  return (
    <span css={[props.css, Image.styles.element]}>
      <FadeInImage
        {...props}
        src={withPrefix(min ? `${dirname.replace(/^\/forestry/, `/${source}`)}/${stem}${extname}` : src)}
        alt={alt}
        css={Image.styles.image}
        lazy={true}
      />
      {trace && (
        <FadeInImage
          {...props}
          src={withPrefix(`${dirname.replace(/^\/forestry/, `/traces`)}/${stem}.svg`)}
          alt={alt}
          css={Image.styles.trace}
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

const FadeInImage = ({ lazy, ...props }) => {
  const Child = lazy ? LazyLoadImage : 'img'
  const [ready, setReady] = useState(false)

  const ref = useCallback(node => {
    if (!ready && node !== null && node.complete) {
      setReady(true)
    }
  }, [])

  return (
    <Child
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
