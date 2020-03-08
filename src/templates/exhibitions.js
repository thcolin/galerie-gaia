import React from 'react'
import Layout from 'components/Layout'
import usePagination from 'hooks/use-pagination'

const Exhibitions = ({ ...props }) => {
  const { pageContext: { pages } } = props

  const exhibitions = pages.filter(exhibition =>
    exhibition.frontmatter.template === 'exhibition' &&
    exhibition.frontmatter.display
  )

  const { page, setPage, pieces, length } = usePagination(exhibitions, 10)

  return (
    <Layout {...props}>
      <section css={Exhibitions.styles.element}>
        {pieces.map((exhibition, index) => (
          <article key={index} />
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
