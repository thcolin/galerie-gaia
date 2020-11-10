import React, { useEffect, useMemo, useState, useRef } from 'react'
import { Link } from 'gatsby'
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import isMobile from 'is-mobile'
import { css } from 'emotion'
import usePagination from 'hooks/use-pagination'
import SEO from 'components/SEO'
import Layout from 'components/Layout'
import RichText from 'components/RichText'
import Reinsurance from 'components/Reinsurance'
import Icon from 'components/Icon'
import Work from 'components/Work'
import Image from 'components/Image'
import Heading from 'components/Heading'
import Options from 'components/Options'
import shuffle from 'utils/shuffle'

const Catalogue = ({ scrollPosition, ...props }) => {
  const { pageContext: { pages, frontmatter } } = props
  const ref = useRef(null)
  const [values, setValues] = useState((typeof history !== 'undefined' && history.state?.values) || {})

  const fields = useMemo(() => Array.from(new Set(pages
    .filter(page => page.frontmatter.expose)
    .map(page => page.frontmatter.template === 'artist' ? page.frontmatter.fields : [])
    .reduce((acc, curr) => [...acc, ...(curr || [])], [])
    .filter(field => !['Séléction'].includes(field))
  )), [])

  const styles = useMemo(() => Array.from(new Set(pages
    .filter(page => page.frontmatter.expose)
    .map(page => page.frontmatter.template === 'artist' ? page.frontmatter.styles : [])
    .reduce((acc, curr) => [...acc, ...(curr || [])], [])
  )), [])

  const artists = useMemo(() => shuffle(pages.filter(page => (
    page
    && page.frontmatter.template === 'artist'
    && !!page.frontmatter.expose
    && page.frontmatter.works.filter(work => !work.sold).length
    && !page.frontmatter.fields.includes('Séléction')
  )), new Date(new Date().setHours(0,0,0,0)).getTime()), [])

  const carousel = useMemo(() => (artists
    .map(page => page.frontmatter.works.filter(work => !work.sold)[0])
    .filter(work => !!work)
    .slice(0, 5)
  ), [])

  const options = useMemo(() => ({
    artists: {
      type: 'select',
      transform: (page, artists) => !artists.length ? page : ({
        ...page,
        frontmatter: {
          ...page.frontmatter,
          works: artists.map(artist => artist.value).includes(page.frontmatter.title) ? page.frontmatter.works : [],
        },
      }),
      props: {
        label: 'Artistes',
        isMulti: true,
        isSearchable: true,
        options: artists.map(artist => ({
          value: artist.frontmatter.title,
          label: artist.frontmatter.title,
        }))
      }
    },
    styles: {
      type: 'select',
      transform: (page, styles) => !styles.length ? page : ({
        ...page,
        frontmatter: {
          ...page.frontmatter,
          works: page.frontmatter.works.filter(work => (
            (styles.some(style => (page.frontmatter.styles || []).includes(style.value)) && (work.styles || []).length === 0)
            || styles.some(style => (work.styles || []).includes(style.value))
          )),
        }
      }),
      props: {
        label: 'Styles Artistiques',
        isMulti: true,
        options: styles.map(style => ({
          value: style,
          label: style,
        })),
      },
    },
    fields: {
      type: 'select',
      transform: (page, fields) => !fields.length ? page : ({
        ...page,
        frontmatter: {
          ...page.frontmatter,
          works: page.frontmatter.works.filter(work => (
            (fields.some(field => (page.frontmatter.fields || []).includes(field.value)) && (work.fields || []).length === 0)
            || fields.some(field => (work.fields || []).includes(field.value))
          )),
        }
      }),
      props: {
        label: 'Techniques Artistiques',
        isMulti: true,
        options: fields.map(field => ({
          value: field,
          label: field,
        })),
      },
    },
    // TODO: Add `color`
    price: {
      type: 'range',
      default: [
        0,
        artists.reduce((res, artist) => Math.max(res, artist.frontmatter.works.reduce((acc, work) => Math.max(parseInt(acc), work.price), 0)), 0)
      ],
      transform: (page, range) => ({
        ...page,
        frontmatter: {
          ...page.frontmatter,
          works: page.frontmatter.works.filter(work => parseInt(work.price) >= range[0] && parseInt(work.price) <= range[1]),
        },
      }),
      props: {
        label: 'Prix',
        labelize: (v) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumSignificantDigits: 12 }).format(v),
      }
    },
    // orientation: {
    //   // type: 'buttons',
    //   validate: (page, value) => page
    // },
    width: {
      type: 'range',
      default: [
        0,
        artists.reduce((res, artist) => Math.max(res, artist.frontmatter.works.reduce((acc, work) => Math.max(acc, (parseInt(work.dimensions?.width) || 0)), 0)), 0)
      ],
      transform: (page, range) => ({
        ...page,
        frontmatter: {
          ...page.frontmatter,
          works: page.frontmatter.works.filter(work => (parseInt(work.dimensions?.width) || 0) >= range[0] && (parseInt(work.dimensions?.width) || 0) <= range[1]),
        },
      }),
      props: {
        label: 'Largeur',
        labelize: (v) => v > 100 ? `${(v / 100).toFixed(2)} m` : `${v} cm`,
      }
    },
    height: {
      type: 'range',
      default: [
        0,
        artists.reduce((res, artist) => Math.max(res, artist.frontmatter.works.reduce((acc, work) => Math.max(acc, (parseInt(work.dimensions?.height) || 0)), 0)), 0)
      ],
      transform: (page, range) => ({
        ...page,
        frontmatter: {
          ...page.frontmatter,
          works: page.frontmatter.works.filter(work => (parseInt(work.dimensions?.height) || 0) >= range[0] && (parseInt(work.dimensions?.height) || 0) <= range[1]),
        },
      }),
      props: {
        label: 'Hauteur',
        labelize: (v) => v > 100 ? `${(v / 100).toFixed(2)} m` : `${v} cm`,
      }
    },
  }), [])

  const entities = useMemo(() => (artists
    .map(page => Object.keys(values).reduce((acc, key) => options[key].transform(acc, values[key]), {
      ...page,
      frontmatter: {
        ...page.frontmatter,
        works: page.frontmatter.works.filter(work => !work.sold),
      }
    }))
    .filter(artist => artist.frontmatter.works.filter(work => !work.sold).length)
  ), [artists, values])

  const { page, setPage, pieces, length } = usePagination(entities, 10, { initial: (typeof history !== 'undefined' && history.state?.page) || 0 })

  useEffect(() => {
    if (Object.keys(values).length || page > 0) {
      history.pushState({ values, page }, document.title)
    }
  }, [values, page])

  const movePage = (page) => {
    if (ref.current) {
      ref.current.scrollIntoView()
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    setTimeout(() => {
      setPage(page)
    }, 1000)
  }

  return (
    <Layout {...props}>
      <SEO
        title={frontmatter.seo.title}
        description={frontmatter.seo.description}
        image={pieces[0]?.frontmatter?.works?.filter(work => !work.sold).shift()?.image}
        pageContext={props.pageContext}
      />
      <section ref={ref} css={Catalogue.styles.element}>
        <Heading>{frontmatter.seo.heading}</Heading>
        <CarouselProvider
          isPlaying
          infinite
          interval={isMobile() ? 3000 : 5000}
          touchEnabled={false}
          dragEnabled={false}
          totalSlides={carousel.length}
          className={css(Catalogue.styles.carousel)}
        >
          <Slider>
            {carousel.map((slide, index) => (
              <Slide key={index} className={css(Catalogue.styles.slide)}>
                <Image src={slide.image} />
              </Slide>
            ))}
          </Slider>
        </CarouselProvider>
        <h1>{frontmatter.title}</h1>
        <RichText children={frontmatter.description} />
        <div css={Catalogue.styles.reinsurance}>
          <Reinsurance />
        </div>
        {pieces.length && (
          <small css={Catalogue.styles.resume}>
            <code>
              <strong>{entities.length}</strong> Artistes // <strong>{entities.reduce((acc, curr) => acc + curr.frontmatter.works.length, 0)}</strong> Oeuvres
            </code>
          </small>
        )}
        <Options options={options} setPage={setPage} values={values} setValues={setValues} />
        <div css={Catalogue.styles.results}>
          {pieces
            .map(artist => (
              <article key={artist.relativePath} css={Catalogue.styles.artist}>
                <label><Link to={artist.url}>{artist.frontmatter.title}</Link></label>
                <div css={Catalogue.styles.row}>
                  {artist.frontmatter.works.filter(work => !work.sold).map((work, index) => (
                    <div css={Catalogue.styles.work} key={index}>
                      <Work title={work.title} image={work.image} url={artist.url} state={{ work: work.title }} />
                    </div>
                  ))}
                </div>
              </article>
            ))
          }
          {!pieces.length && (
            <div css={Catalogue.styles.empty}>
              Désolé, aucune oeuvres ne correspond à vos critères pour le moment
            </div>
          )}
        </div>
        {length > 1 && (
          <nav>
            <button disabled={page === 0} onClick={() => movePage(page - 1)}>
              <Icon children="arrow" direction="left" />
            </button>
            <span>{page + 1} / {length}</span>
            <button disabled={(page + 1) === length} onClick={() => movePage(page + 1)}>
              <Icon children="arrow" direction="right" />
            </button>
          </nav>
        )}
      </section>
    </Layout>
  )
}

Catalogue.styles = {
  element: {
    flex: 1,
    padding: '2em',
    '>nav': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 0 2em',
      '>button': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 1rem',
        paddingRight: '0.33em',
      },
    },
  },
  carousel: {
    height: '15rem',
    width: '100%',
    margin: '0 0 2rem',
    '>div': {
      height: '100%',
      width: '100%',
      '>div': {
        height: '100%',
        width: '100%',
        '>ul': {
          height: '100%',
          width: '100%',
          '>li': {
            height: '100%',
            width: '100%',
          },
        },
      },
    },
  },
  slide: {
    img: {
      height: '100%',
      width: '100%',
      objectFit: 'cover',
    },
  },
  results: {
  },
  resume: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1em 0',
    textAlign: 'center',
  },
  empty: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4em 0',
    textAlign: 'center',
  },
  artist: {
    padding: '0 0 2em 0',
    '>label': {
      fontWeight: 'bold',
      fontSize: '1.25em'
    }
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    overflowY: 'auto',
  },
  work: {
    flexShrink: 0,
    fontSize: '0.875em',
    height: '20em',
    width: '20em',
    padding: '2em',
  },
  reinsurance: {
    margin: '2rem 0 1rem 0',
  }
}

export default Catalogue
