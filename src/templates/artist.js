import React, { useState, useEffect } from 'react'
import { withPrefix } from 'gatsby'
import { Redirect } from '@reach/router'
import Layout from 'components/Layout'
import RichText from 'components/RichText'
import Contact from 'components/Contact'
import Image from 'components/Image'
import Icon from 'components/Icon'
import Carousel, { Dots } from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import theme from 'theme'

const Artist = ({ ...props }) => {
  const { pageContext: { frontmatter } } = props

  if (!frontmatter.expose) {
    return (
      <Redirect to='/artists' />
    )
  }

  const works = frontmatter.works.filter(work => !work.sold)
  const slides = works.map(work => work.image).filter(image => !!image)
  const [slide, setSlide] = useState(0)
  const index = (slide >= 0 ? slide : Math.ceil(Math.abs(slide / slides.length))) % slides.length

  const [ready, setReady] = useState(false)
  useEffect(() => {
    setReady(true)
  }, [])

  return (
    <Layout {...props}>
      <section css={Artist.styles.element}>
        {!!works.length && (
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
                  <Zoom key={index}>
                    <div css={Artist.styles.slide}>
                      <Image src={image} />
                    </div>
                  </Zoom>
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
              {works.map((work, i) => (
                <div key={i} style={{ display: i !== index ? 'none' : 'block' }}>
                  <h2><cite>{work.title}</cite></h2>
                  <span>
                    {work.technique}
                    {(
                      work.dimensions?.height ||
                      work.dimensions?.width ||
                      work.dimensions?.depth
                    ) && ` (${[
                      work.dimensions?.height,
                      work.dimensions?.width,
                      work.dimensions?.depth,
                    ].filter(size => size).join(' x ')})`}
                  </span>
                  {!!work.price && (
                    <small>{work.price} €</small>
                  )}
                  {!!work.description && (
                    <RichText children={work.description} />
                  )}
                  <Contact
                    id="PHr_SEkN0Pj2VLhcXtR5H"
                    placeholder="Une demande de renseignement sur cette oeuvre ?"
                    toggle={true}
                    inputs={[
                      ...Object.keys(work).filter(name => work[name] && work[name] !== '0').map(name => ({
                        name,
                        value: (
                          typeof work[name] === 'object' ? JSON.stringify(work[name]) :
                          name === 'image' ? `${typeof window !== 'undefined' && `${window.location?.protocol}//${window.location?.hostname}`}${withPrefix(work.image)}` :
                          work[name]
                        ),
                      })),
                      {
                        name: 'artist',
                        value: frontmatter.title,
                      },
                    ]}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        <div css={Artist.styles.about}>
          <h1>{frontmatter.title}</h1>
          {!!(parseInt(frontmatter.birth) || parseInt(frontmatter.death)) && (
            <small>
              ({[parseInt(frontmatter.birth), parseInt(frontmatter.death)].filter(year => year).join(' - ')})
            </small>
          )}
          {!!(frontmatter.location || frontmatter.field) && (
            <p>{[frontmatter.location, frontmatter.field].filter(s => s).join(' - ')}</p>
          )}
          {!!frontmatter.biography && (
            <RichText children={frontmatter.biography} />
          )}
        </div>
        {!!frontmatter.exhibitions?.length && (
          <div css={Artist.styles.exhibitions}>
            <h3>Expositions</h3>
            {frontmatter.exhibitions.map((exhibition, index) => (
              <p css={Artist.styles.exhibition} key={index}>
                {!!(parseInt(exhibition.start) || parseInt(exhibition.end)) && (
                  <>
                    <span>
                      {[
                        parseInt(exhibition.start),
                        parseInt(exhibition.end),
                      ].filter(date => date).join(' - ')}
                    </span>
                    <span> / </span>
                  </>
                )}
                <strong>{exhibition.location}</strong>
                <span> / </span>
                <span>{exhibition.title}</span>
              </p>
            ))}
          </div>
        )}
      </section>
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
    flexShrink: 0,
    [theme.medias.extralarge]: {
      flexDirection: 'row',
    },
  },
  carousel: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'calc(50vh + 7rem)',
    padding: '1rem 0',
    transition: 'opacity ease-in-out 400ms',
    [theme.medias.extralarge]: {
      padding: '1rem 1rem 1rem 0',
      width: '50%',
    },
    '>div': {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'stretch',
      '>div': {
        height: '100%',
        width: '100%',
        '>div': {
          '&:first-of-type': {
            display: 'flex',
          },
          '&:last-of-type': {
            display: 'flex',
          },
        },
        ul: {
          height: '100%',
        },
      },
    },
    '>ul': {
      overflowX: 'auto',
      justifyContent: 'flex-start',
    },
  },
  slide: {
    '>span': {
      '>img': {
        objectFit: 'contain',
        height: '100%',
        width: '100%',
        maxHeight: '50vh',
      },
    },
  },
  thumbnail: {
    height: '3rem',
    width: '5rem',
    '>span': {
      '>img': {
        objectFit: 'contain',
        height: '100%',
        width: '100%',
      },
    },
  },
  work: {
    '>div': {
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
        lineHeight: 1.5,
      },
      '>form': {
        margin: '1rem 0 0 0',
        '>textarea': {
          height: '4rem',
        },
      },
      '>button': {
        margin: '1rem 0 0 0',
      },
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
    padding: '1rem',
    '>h1': {
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
      padding: '0.5em 0',
      lineHeight: '1.5',
    },
  },
  exhibitions: {
    padding: '0 1rem 1rem',
  },
  exhibition: {
    fontSize: '0.875em',
  },
}

export default Artist
