import React, { useEffect, Fragment, useMemo, useState, useRef } from 'react'
import usePagination from 'hooks/use-pagination'
import SEO from 'components/SEO'
import Layout from 'components/Layout'
import Icon from 'components/Icon'
import RichText from 'components/RichText'
import Image from 'components/Image'
import Heading from 'components/Heading'
import Options from 'components/Options'
import theme from 'theme'

const Blog = ({ scrollPosition, ...props }) => {
  const { pageContext: { pages, frontmatter } } = props
  const { articles } = frontmatter
  const ref = useRef(null)
  const [values, setValues] = useState((typeof history !== 'undefined' && history.state?.values) || {})

  const categories = useMemo(() => Array.from(new Set(articles
    .map(article => article.categories)
    .reduce((acc, curr) => [...acc, ...(curr || [])], []))
  ), [])

  const options = useMemo(() => ({
    categories: {
      type: 'select',
      filter: (article, categories) => !categories.length || categories.some(category => (article.categories || []).includes(category.value)),
      props: {
        label: `Catégories d'Actualité`,
        isMulti: true,
        options: categories.map(category => ({
          value: category,
          label: category,
        })),
      },
    },
  }), [])

  const entities = useMemo(() => (articles
    .filter(article => Object.keys(values).every(key => options[key].filter(article, values[key])))
  ), [articles, values])

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
        image={pieces[0]?.exhibition?.image}
        pageContext={props.pageContext}
      />
      <Heading>{frontmatter.seo.heading}</Heading>
      <section ref={ref} css={Blog.styles.element}>
        <Heading>{frontmatter.seo.heading}</Heading>
        <Options options={options} setPage={setPage} values={values} setValues={setValues} />
        <div css={Blog.styles.results}>
          {pieces.map((article, index) => (
            <Fragment key={article.title}>
              <article css={Blog.styles.article}>
                <Image src={article.image} />
                <div>
                  <h2>{article.title}</h2>
                  <p>
                    {article.categories.join(', ')}
                    {!!article.date ? ` - ${new Date(article.date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}` : ''}
                  </p>
                  <RichText children={article.content} />
                </div>
              </article>
              <hr />
            </Fragment>
          ))}
          {!pieces.length && (
            <div css={Blog.styles.empty}>
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

Blog.styles = {
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
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: '2em 2em 0',
  },
  article: {
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    [theme.medias.small]: {
      flexDirection: 'column',
    },
    '>span': {
      flex: 0,
      alignItems: 'center',
      minHeight: '20rem',
      minWidth: '15rem',
      maxWidth: '50%',
      [theme.medias.small]: {
        flex: 1,
        height: '15rem',
        maxHeight: 'unset',
        minWidth: 'unset',
        maxWidth: 'unset',
        margin: '0 0 2rem 0',
      },
      '>img': {
        objectFit: 'contain',
      },
    },
    '>div': {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      margin: '0 0 0 2rem',
      [theme.medias.small]: {
        margin: 0,
      },
      '>p': {
        margin: 0,
        fontStyle: 'italic',
        textDecoration: 'underline',
      },
      '>div': {
        lineHeight: '1.5',
      },
    },
  },
  empty: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4em 0',
    textAlign: 'center',
  },
}

export default Blog
