import React, { useState } from 'react'
import Image from 'components/Image'
import trapScroll from 'utils/trapScroll'

const Contextual = ({ work, ...props }) => {
  const sizes = {
    'medium': {
      height: [1, 180],
      width: [1, 140],
      ratio: 220, // (width of the picture in cm)
      container: '11% 0 42%',
    },
  }

  if (!work.dimensions || !work.dimensions?.width || !work.dimensions?.height) {
    return null
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
  const [open, _setOpen] = useState(false)
  const setOpen = (value) => {
    _setOpen(value)
    trapScroll(value)
  }

  return (
    <div {...props}>
      <button onClick={() => setOpen(true)}>Voir l'oeuvre en contexte</button>
      <div css={Contextual.styles.modal} hidden={!open} style={{ top: typeof window === 'undefined' ? 0 : window.scrollY }}>
        <div css={Contextual.styles.container}>
          <div css={Contextual.styles.body}>
            <Image src={`/forestry/assets-wall-${key}.jpg`} rel="preload" css={Contextual.styles.wall} />
            <div
              css={Contextual.styles.work}
              style={{
                width: `${((work.dimensions.width / size.ratio) * 100)}%`,
                margin: size.container,
              }}
            >
              <Image src={work.image} />
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
    height: '100%',
  },
  wall: {

  },
  work: {
    position: 'absolute',
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
