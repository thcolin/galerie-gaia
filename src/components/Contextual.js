import React, { useState } from 'react'
import Image from 'components/Image'
import Icon from 'components/Icon'
import useEvent from 'react-use/lib/useEvent'

const Contextual = ({ work, ...props }) => {
  if (!work.dimensions || !work.dimensions?.width || !work.dimensions?.height) {
    return null
  }

  const sizes = {
    small: {
      height: [1, 69],
      width: [1, 70],
      ratio: 160,
      margin: `${24 - (12 * ((work.dimensions.height - 60) / (180 - 60)))}% 0 60%`,
    },
    medium: {
      height: [70, 165],
      width: [1, 132],
      ratio: 170, // (width of the picture in cm)
      margin: `${24 - (12 * ((work.dimensions.height - 60) / (180 - 60)))}% 0 60%`,
    },
  }

  const key = Object.keys(sizes).filter(size => (
    work.dimensions.height >= sizes[size].height[0]
    && work.dimensions.height <= sizes[size].height[1]
    && work.dimensions.width >= sizes[size].width[0]
    && work.dimensions.width <= sizes[size].width[1]
  )).pop()
  
  if (!key) {
    return false
  }

  const size = sizes[key]
  const [open, setOpen] = useState(false)
  
  useEvent('keydown', (e) => !(e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) && setOpen(false), typeof document !== 'undefined' && document)
  useEvent('scroll', () => setOpen(false), typeof window !== 'undefined' && window)

  return (
    <div {...props}>
      <button onClick={() => setOpen(true)}>
        <Icon children="couch" style={{ margin: '0 0.5rem 0 0' }} />
        Voir l'oeuvre en contexte
      </button>
      <div css={Contextual.styles.modal} hidden={!open} style={{ top: typeof window === 'undefined' ? 0 : window.scrollY }}>
        <div css={Contextual.styles.container}>
          <div css={Contextual.styles.body}>
            <div css={Contextual.styles.wall}>
              <Image src={`/forestry/assets-wall-${key}.jpg`} rel="preload" />
              <div
                css={Contextual.styles.work}
                style={{
                  width: `${((work.dimensions.width / size.ratio) * 100)}%`,
                  margin: size.margin,
                }}
              >
                <Image src={work.image} />
              </div>
            </div>
          </div>
        </div>
        <button onClick={() => setOpen(false)} style={Contextual.styles.close} />
      </div>
    </div>
  )
}

Contextual.styles = {
  modal: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
  },
  body: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: '100vh',
  },
  wall: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    maxHeight: '100vh',
    '>span>img': {
      height: 'auto',
      maxHeight: '100vh',
      width: 'auto',
      maxWidth: '100%',
      objectFit: 'contain',
    },
  },
  work: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'flex-start',
    top: 0,
    bottom: 0,
    '>span': {
      height: 'auto',
      '>img': {
        objectFit: 'contain',
        background: 'transparent',
      },
    },
  },
  close: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    opacity: 0,
    top: 0,
    cursor: 'zoom-out',
  },
}

export default Contextual
