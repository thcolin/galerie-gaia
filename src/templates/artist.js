import React, { useState, useEffect } from 'react'
import Layout from 'components/Layout'
import RichText from 'components/RichText'
import Image from 'components/Image'
import Icon from 'components/Icon'
import Carousel, { Dots } from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css'
import resolve from 'utils/resolve'
import theme from 'theme'

const Artist = ({ ...props }) => {
  const { pageContext } = props
  const { frontmatter, relativePath, pages } = pageContext

  const works = pages.filter(page => (
    page.frontmatter.template === 'work' &&
    page.frontmatter.artist === resolve.fromGatsby2Filesystem(relativePath)
  ))

  const slides = works.map(work => work.frontmatter.image).filter(image => !!image)
  const [slide, setSlide] = useState(0)
  const index = (slide >= 0 ? slide : Math.ceil(Math.abs(slide / slides.length))) % slides.length
  const work = works[index]

  const [ready, setReady] = useState(false)
  useEffect(() => {
    setReady(true)
  }, [])

  return (
    <Layout {...props}>
      <div css={Artist.styles.element}>
        {works.length && (
          <div css={Artist.styles.works}>
            <div
              css={Artist.styles.carousel}
              style={{
                opacity: ready ? 1 : 0,
              }}
            >
              <Carousel
                arrows
                stopAutoPlayOnHover
                arrowLeft={<Icon children='arrow' direction='left' css={Artist.styles.icon} />}
                arrowLeftDisabled={<Icon children='arrow' direction='left' css={Artist.styles.icon} style={{ opacity: 0.25 }} />}
                arrowRight={<Icon children='arrow' direction='right' css={Artist.styles.icon} />}
                arrowRightDisabled={<Icon children='arrow' direction='right' css={Artist.styles.icon} style={{ opacity: 0.25 }} />}
                addArrowClickHandler
                value={slide}
                onChange={(slide) => setSlide(slide)}
                slides={slides.map((image, index) => (
                  <div css={Artist.styles.slide} key={index}>
                    <Image src={image} />
                  </div>
                ))}
              />
              <Dots
                value={slide}
                onChange={(slide) => setSlide(slide)}
                number={slides.length}
                thumbnails={slides.map((image, index) => (
                  <div css={Artist.styles.thumbnail} key={index}>
                    <Image src={image} />
                  </div>
                ))}
              />
            </div>
            <div css={Artist.styles.work}>
              <h2>{work.frontmatter.title}</h2>
              <span>{work.frontmatter.technique}</span>
              <small>{work.frontmatter.price} €</small>
              {!!work.frontmatter.description && (
                <RichText children={work.frontmatter.description} />
              )}
            </div>
          </div>
        )}
        <div css={Artist.styles.about}>
          <h2>{frontmatter.title}</h2>
          {(frontmatter.birth || frontmatter.death) && (
            <small>({[frontmatter.birth, frontmatter.death].filter(year => year).join(' - ')})</small>
          )}
          <p>{[frontmatter.location, frontmatter.field].join(' - ')}</p>
          {!!frontmatter.biography && (
            <RichText children={frontmatter.biography} />
          )}
        </div>
      </div>
    </Layout>
  )
}

Artist.styles = {
  element: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    maxWidth: '100%',
  },
  works: {
    display: 'flex',
    flexDirection: 'column',
    [theme.medias.extralarge]: {
      flexDirection: 'row',
    },
  },
  carousel: {
    padding: '1rem 0',
    transition: 'opacity ease-in-out 400ms',
    [theme.medias.extralarge]: {
      padding: '1rem 1rem 1rem 0',
      width: '50%',
    },
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
    width: '5rem',
    '>div': {
      '>img': {
        objectFit: 'contain',
        height: '100%',
        width: '100%',
      },
    },
  },
  work: {
    flex: 1,
    padding: '1rem',
    [theme.medias.extralarge]: {
      padding: '2rem 0 1rem 1rem',
    },
    '>h2': {
      padding: 0,
      margin: 0,
      color: theme.colors.black,
    },
    '>span': {
      display: 'block',
      padding: '0.5em 0',
      fontSize: '0.875em',
      color: theme.colors.grey,
    },
    '>small': {
      display: 'block',
      padding: '0.5em 0',
      color: theme.colors.gray,
    },
    '>div': {
      padding: '1em 0',
    },
  },
  icon: {
    padding: '1em',
    height: '100%',
    width: '3em',
    cursor: 'pointer',
  },
  about: {
    flex: 1,
    padding: '1rem 0',
    '>h2': {
      display: 'inline',
      padding: 0,
      margin: 0,
      color: theme.colors.black,
    },
    '>small': {
      display: 'inline',
      padding: '0 0.5em',
      color: theme.colors.gray,
    },
    '>p': {
      fontSize: '0.875em',
    },
    '>div': {
      padding: '1em 0',
      fontSize: '0.875em',
      lineHeight: '1.5',
    },
  },
}

export default Artist
