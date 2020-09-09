import React, { Fragment, useRef } from 'react'
import SEO from 'components/SEO'
import Layout from 'components/Layout'
import Icon from 'components/Icon'
import Image from 'components/Image'
import RichText from 'components/RichText'
import Heading from 'components/Heading'
import usePagination from 'hooks/use-pagination'
import theme from 'theme'

const Exhibitions = ({ ...props }) => {
  const { pageContext: { frontmatter } } = props
  const { exhibitions } = frontmatter

  const ref = useRef(null)
  const { page, setPage, pieces, length } = usePagination(exhibitions, 10)

  const movePage = (page) => {
    setPage(page)
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })

      if (ref.current) {
        ref.current.scrollIntoView()
      }
    }, 300)
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
      <section ref={ref} css={Exhibitions.styles.element}>
        {pieces.map((exhibition, index) => (
          <Fragment key={exhibition.title}>
            <article>
              <Image src={exhibition.image} />
              <div>
                <h2>{exhibition.title}</h2>
                <RichText children={exhibition.content} />
              </div>
            </article>
            <hr />
          </Fragment>
        ))}
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

Exhibitions.styles = {
  element: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: '2em 2em 0',
    '>article': {
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
        '>div': {
          lineHeight: '1.5',
        },
      },
    },
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
}

export default Exhibitions
