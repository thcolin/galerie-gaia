import React from 'react'
import Layout from 'components/Layout'
import Image from 'components/Image'
import RichText from 'components/RichText'
import usePagination from 'hooks/use-pagination'
import theme from 'theme'

const Exhibitions = ({ ...props }) => {
  const { pageContext: { frontmatter } } = props
  const { exhibitions } = frontmatter

  const { page, setPage, pieces, length } = usePagination(exhibitions, 10)

  return (
    <Layout {...props}>
      <section css={Exhibitions.styles.element}>
        {pieces.map((exhibition, index) => (
          <>
            <article key={index}>
              <Image src={exhibition.image} />
              <div>
                <h2>{exhibition.title}</h2>
                <RichText children={exhibition.content} />
              </div>
            </article>
            <hr />
          </>
        ))}
        {length > 1 && (
          <nav>
            <button disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</button>
            <span>{page + 1} / {length}</span>
            <button disabled={(page + 1) === length} onClick={() => setPage(page + 1)}>Next</button>
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
    padding: '2em',
    '>article': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      [theme.medias.small]: {
        flexDirection: 'column',
      },
      '>span': {
        flex: 0,
        maxHeight: '15rem',
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
        '>div': {
          lineHeight: '1.5',
        },
      },
    },
    '>nav': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '>button': {
        margin: '0 1rem',
      },
    },
  },
}

export default Exhibitions
