import { Fragment, useState, useEffect } from 'react'
import { Redirect } from '@reach/router'
import SEO from 'components/SEO'
import Layout from 'components/Layout'
import RichText from 'components/RichText'
import Reinsurance from 'components/Reinsurance'
import Contact from 'components/Contact'
import Contextual from 'components/Contextual'
import Image from 'components/Image'
import Icon from 'components/Icon'
import Carousel, { Dots } from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { fromFilesystem2S3 } from 'utils/resolve'
import theme from 'theme'

const Artist = ({ location, ...props }) => {
  const { pageContext: { frontmatter } } = props

  if (!frontmatter.expose) {
    return (
      <Redirect to='/artists' />
    )
  }

  const works = frontmatter.works.filter(work => !work.sold)
  const slides = works.map(work => work.image).filter(image => !!image)
  const [slide, setSlide] = useState(location.state?.work ? works.filter(work => !!work.image).findIndex(work => work.title === location.state.work) : 0)
  const index = (slide >= 0 ? slide : Math.ceil(Math.abs(slide / slides.length))) % slides.length

  const [ready, setReady] = useState(false)
  useEffect(() => {
    setReady(true)
  }, [])

  return (
    <Layout {...props}>
      <SEO
        title={frontmatter.seo?.title || `${frontmatter.title}${frontmatter.fields.length ? `, ${(frontmatter.fields || []).join(', ')}` : ''} - Galerie Gaïa`}
        description={frontmatter.seo?.description || `Découvrez, réservez et commandez les œuvres de ${frontmatter.title}${frontmatter.fields.length ? `, ${(frontmatter.fields || []).join(', ')}` : ''}, à la Galerie Gaïa, galerie d'art en ligne et à Nantes.`}
        image={slides[0]}
        pageContext={props.pageContext}
      />
      <section css={Artist.styles.element}>
        <div css={Artist.styles.about}>
          <h1>{frontmatter.title}</h1>
          {!!(parseInt(frontmatter.birth) || parseInt(frontmatter.death)) && (
            <small>
              ({[parseInt(frontmatter.birth), parseInt(frontmatter.death)].filter(year => year).join(' - ')})
            </small>
          )}
          {!!(frontmatter.location || (frontmatter.fields || []).length) && (
            <p>{[frontmatter.location, (frontmatter.fields || []).join(', ')].filter(s => s).join(' - ')}</p>
          )}
        </div>
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
                    <Image src={image} source="thumbnails" />
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
                  <br/>
                  {!work.sold && (
                    <Fragment>
                      <Contact
                        id="UCmdKCfm"
                        method="buy"
                        placeholder="Nous allons vous recontacter pour établir les détails de votre acquisition, n'hésitez pas à demander des renseignements supplémentaires !"
                        toggle={true}
                        inputs={[
                          ...Object.keys(work).filter(name => work[name] && work[name] !== '0').map(name => ({
                            name,
                            value: (
                              typeof work[name] === 'object' ? JSON.stringify(work[name]) :
                              name === 'image' ? fromFilesystem2S3(work.image) : work[name]
                            ),
                          })),
                          {
                            name: 'artist',
                            value: frontmatter.title,
                          },
                        ]}
                      />
                     <hr />
                    </Fragment>
                  )}
                  {!!work.contextual && (
                    <Contextual work={work} />
                  )}
                  <Contact
                    id="PHr_SEkN0Pj2VLhcXtR5H"
                    placeholder="Une hésitation, une question, une demande de renseignement sur cette oeuvre, vous souhaitez plus de photos ? Envoyez nous un message !"
                    toggle={true}
                    inputs={[
                      ...Object.keys(work).filter(name => work[name] && work[name] !== '0').map(name => ({
                        name,
                        value: (
                          typeof work[name] === 'object' ? JSON.stringify(work[name]) :
                          name === 'image' ? fromFilesystem2S3(work.image) : work[name]
                        ),
                      })),
                      {
                        name: 'artist',
                        value: frontmatter.title,
                      },
                    ]}
                  />
                  <Contact
                    id="66QKKrtv"
                    method="phone"
                    toggle={true}
                    inputs={[
                      ...Object.keys(work).filter(name => work[name] && work[name] !== '0').map(name => ({
                        name,
                        value: (
                          typeof work[name] === 'object' ? JSON.stringify(work[name]) :
                          name === 'image' ? fromFilesystem2S3(work.image) : work[name]
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
        <div css={Artist.styles.reinsurance}>
          <Reinsurance />
        </div>
        {!!frontmatter.biography && (
          <div css={Artist.styles.biography}>
            <label>Biographie</label>
            <RichText children={frontmatter.biography} />
          </div>
        )}
          {!!frontmatter.exhibitions?.length && (
          <div css={Artist.styles.exhibitions}>
            <label>Expositions</label>
            {frontmatter.exhibitions.map((exhibition, index) => (
              <p css={Artist.styles.exhibition} key={index}>
                {!!(parseInt(exhibition.start) || parseInt(exhibition.end)) && (
                  <Fragment>
                    <span>
                      {[
                        parseInt(exhibition.start),
                        parseInt(exhibition.end),
                      ].filter(date => date).join(' - ')}
                    </span>
                    <span> / </span>
                  </Fragment>
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
      alignSelf: 'flex-start',
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
    flex: 1,
    padding: '0 1rem 0 0',
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
        color: theme.colors.gray,
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
          height: '6rem',
        },
      },
      '>button': {
        margin: '1rem 0',
      },
    },
  },
  icon: {
    padding: '1em',
    height: '100%',
    width: '4em',
    cursor: 'pointer',
  },
  about: {
    padding: '3rem 1rem 1rem',
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
      marginBottom: 0
    },
  },
  reinsurance: {
    margin: '2rem 1rem 0',
  },
  biography: {
    padding: '0 1rem 1rem',
    '>div': {
      padding: '0.5em 0',
      lineHeight: '1.5',
    },
    '>label': {
      display: 'block',
      fontSize: '1.25em',
      fontWeight: 'bold',
      margin: '1em 0',
    }
  },
  exhibitions: {
    padding: '0 1rem 1rem',
    '>label': {
      display: 'block',
      fontSize: '1.25em',
      fontWeight: 'bold',
      margin: '1em 0',
    }
  },
  exhibition: {
    fontSize: '0.875em',
  },
}

export default Artist
