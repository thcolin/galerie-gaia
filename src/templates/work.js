import React, { useState } from 'react'
import Layout from 'components/Layout'
import RichText from 'components/RichText'
import Image from 'components/Image'
import Carousel, { Dots } from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css'
import theme from 'theme'

const Work = ({ ...props }) => {
  const [slide, setSlide] = useState(0)
  const { frontmatter } = props.pageContext

  return (
    <Layout {...props}>
      <div css={Work.styles.element}>
        <div css={Work.styles.carousel}>
          {(frontmatter.images || []).length && (
            <>
              <Carousel
                arrows
                infinite
                value={slide}
                onChange={(slide) => setSlide(slide)}
                slides={frontmatter.images.map((image, index) => (
                  <div css={Work.styles.slide} key={index}>
                    <Image src={image} />
                  </div>
                ))}
              />
              <Dots
                value={slide}
                onChange={(slide) => setSlide(slide)}
                number={frontmatter.images.length}
                thumbnails={frontmatter.images.map((image, index) => (
                  <div css={Work.styles.thumbnail} key={index}>
                    <Image src={image} />
                  </div>
                ))}
              />
            </>
          )}
        </div>
        <div css={Work.styles.about}>
          <h2>{frontmatter.title}</h2>
          {!!frontmatter.description && (
            <RichText children={frontmatter.description} />
          )}
        </div>
      </div>
    </Layout>
  )
}

Work.styles = {
  element: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column-reverse',
    width: '100vw',
    overflowX: 'hidden',
    [theme.medias.large]: {
      flexDirection: 'row',
    },
  },
  carousel: {
    width: '50%',
    padding: '2em',
  },
  slide: {
    '>img': {
      objectFit: 'contain',
      height: '100%',
      width: '100%',
    },
  },
  thumbnail: {
    height: '3rem',
    '>img': {
      objectFit: 'contain',
      height: '100%',
      width: '100%',
    },
  },
  about: {
    flex: 1,
    [theme.medias.large]: {
      // width: '50%',
    },
  },
}

export default Work
