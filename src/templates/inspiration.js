import React, { useEffect, useMemo, useState, useRef } from 'react'
import { Link } from 'gatsby'
import usePagination from 'hooks/use-pagination'
import SEO from 'components/SEO'
import Layout from 'components/Layout'
import Icon from 'components/Icon'
import Work from 'components/Work'
import Heading from 'components/Heading'
import Options from 'components/Options'

const Inspiration = ({ scrollPosition, ...props }) => {
  const { pageContext: { pages, frontmatter } } = props
  const ref = useRef(null)
  const [values, setValues] = useState((typeof history !== 'undefined' && history.state?.values) || {})

  const fields = useMemo(() => Array.from(new Set(pages
    .map(page => page.frontmatter.template === 'artist' ? page.frontmatter.fields : [])
    .reduce((acc, curr) => [...acc, ...(curr || [])], []))
  ), [])

  const styles = useMemo(() => Array.from(new Set(pages
    .map(page => page.frontmatter.template === 'artist' ? page.frontmatter.styles : [])
    .reduce((acc, curr) => [...acc, ...(curr || [])], []))
  ), [])

  const artists = useMemo(() => pages.filter(page => (
    page
    && page.frontmatter.template === 'artist'
    && !!page.frontmatter.expose
    && page.frontmatter.works.filter(work => !work.sold).length
  )), [])

  const options = useMemo(() => ({
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
        label: 'Champs Artistique',
        isMulti: true,
        options: fields.map(field => ({
          value: field,
          label: field,
        })),
      },
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
        label: 'Styles Artistique',
        isMulti: true,
        options: styles.map(style => ({
          value: style,
          label: style,
        })),
      },
    },
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
      <section ref={ref} css={Inspiration.styles.element}>
        <Heading>{frontmatter.seo.heading}</Heading>
        <Options options={options} setPage={setPage} values={values} setValues={setValues} />
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
  results: {
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
}

export default Inspiration
