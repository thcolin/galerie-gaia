import React, { useEffect, useMemo, useState, useRef } from 'react'
import { Link } from 'gatsby'
import usePagination from 'hooks/use-pagination'
import SEO from 'components/SEO'
import Layout from 'components/Layout'
import Icon from 'components/Icon'
import Work from 'components/Work'
import Heading from 'components/Heading'
import Range from 'components/Range'
import Select from '../components/Select'
import theme from 'theme'

const Inspiration = ({ scrollPosition, ...props }) => {
  const { pageContext: { pages, frontmatter } } = props
  const ref = useRef(null)
  const [values, setValues] = useState(history.state?.values || {})

  const fields = useMemo(() => Array.from(new Set(pages
    .map(page => page.frontmatter.template === 'artist' ? page.frontmatter.fields : [])
    .reduce((acc, curr) => [...acc, ...curr], []))
  ), [])

  const artists = useMemo(() => pages.filter(page => (
    page
    && page.frontmatter.template === 'artist'
    && !!page.frontmatter.expose
    && page.frontmatter.works.filter(work => !work.sold).length
  )), [])

  const options = useMemo(() => ({
    fields: {
      // type: 'select',
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
        label: 'Champs Artistique',
        isMulti: true,
        options: fields.map(field => ({
          value: field,
          label: field,
        })),
      },
    },
    // styles: {
    //   // type: 'select',
    // },
    price: {
      // type: 'range',
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
      // type: 'range',
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
      // type: 'range',
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

  const { page, setPage, pieces, length } = usePagination(entities, 10, { initial: history.state?.page || 0 })

  useEffect(() => {
    history.pushState({ values, page }, document.title)
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
      <section ref={ref} css={Inspiration.styles.element}>
        <Heading>{frontmatter.seo.heading}</Heading>
        <div css={Inspiration.styles.toolbar}>
          <Select
            {...options.fields.props}
            value={values.fields || []}
            onChange={(fields) => {
              setValues(values => ({ ...values, fields: fields || [] }))
              setPage(0)
            }}
          />
         <Range
            {...options.price.props}
            min={options.price.default[0]}
            max={options.price.default[1]}
            values={[(values.price || options.price.default)[0], (values.price || options.price.default)[1]]}
            onChange={(price) => {
              setValues(values => ({ ...values, price }))
              setPage(0)
            }}
          />
         <Range
            {...options.height.props}
            min={options.height.default[0]}
            max={options.height.default[1]}
            values={[(values.height || options.height.default)[0], (values.height || options.height.default)[1]]}
            onChange={(height) => {
              setValues(values => ({ ...values, height }))
              setPage(0)
            }}
          />
         <Range
            {...options.width.props}
            min={options.width.default[0]}
            max={options.width.default[1]}
            values={[(values.width || options.width.default)[0], (values.width || options.width.default)[1]]}
            onChange={(width) => {
              setValues(values => ({ ...values, width }))
              setPage(0)
            }}
          />
        </div>
        <div css={Inspiration.styles.results}>
          {pieces
            .map(artist => (
              <article key={artist.relativePath} css={Inspiration.styles.artist}>
                <label><Link to={artist.url}>{artist.frontmatter.title}</Link></label>
                <div css={Inspiration.styles.row}>
                  {artist.frontmatter.works.filter(work => !work.sold).map(work => (
                    <div css={Inspiration.styles.work}>
                      <Work title={work.title} image={work.image} url={artist.url} state={{ work: work.title }} />
                    </div>
                  ))}
                </div>
              </article>
            ))
          }
          {!pieces.length && (
            <div css={Inspiration.styles.empty}>
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

Inspiration.styles = {
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
  toolbar: {
    position: 'sticky',
    top: '0',
    background: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '2em 0',
    margin: '0 0 2em',
    zIndex: 2,
    [theme.medias.small]: {
      position: 'block',
      top: 'unset',
      flexDirection: 'column',
      '>*': {
        paddingLeft: '0em !important',
        paddingRight: '0em !important',
        paddingTop: '1em',
        paddingBottom: '1em',
        ':first-of-type': {
          paddingTop: '0em',
        },
        ':last-of-type': {
          paddingBottom: '0em',
        },
      },
    },
    '>*': {
      paddingLeft: '1em',
      paddingRight: '1em',
      ':first-of-type': {
        paddingLeft: '0em',
      },
      ':last-of-type': {
        paddingRight: '0em',
      },
    },
  },
  results: {
    // display: 'grid',
    // gridTemplateColumns: 'repeat(auto-fill, 16em)',
    // gridGap: '2rem',
    // justifyContent: 'space-between',
    // [theme.medias.small]: {
    //   justifyContent: 'center',
    // },
    // [theme.medias.medium]: {
    //   justifyContent: 'center',
    // },
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
    fontSize: '0.5em',
    height: '20em',
    width: '20em',
    padding: '2em',
  },
}

export default Inspiration
