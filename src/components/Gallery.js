import React from 'react'
import Image from 'components/Image'

const Gallery = ({ images, ...props }) => (
  <div css={Gallery.styles.element}>
    {images.map(image => (
      <Image key={image} src={image} width='100%' />
    ))}
  </div>
)

Gallery.styles = {
  element: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 10rem)',
    gridGap: '1rem',
    justifyContent: 'space-between',
    '>span>img': {
      objectFit: 'contain',
    },
  },
}

export default Gallery
