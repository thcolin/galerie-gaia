import { memo, useState, useCallback } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { fromFilesystem2S3 } from 'utils/resolve'
import theme from 'theme'

const Image = ({ min = true, trace = true, src = '', alt = '', source = 'originals', ...props }) => (
  <span css={[props.css, Image.styles.element]}>
    <FadeInImage
      {...props}
      src={min ? fromFilesystem2S3(src, source) : src}
      alt={alt}
      css={Image.styles.image}
      lazy={true}
    />
    {trace && (
      <FadeInImage
        {...props}
        src={fromFilesystem2S3(src, 'traces')}
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

const FadeInImage = memo(({ lazy, ...props }) => {
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
})

export default memo(Image)
