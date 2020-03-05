import React from 'react'
import Layout from 'components/Layout'
import Artist from 'components/Artist'

const Artists = ({ ...props }) => {
  const { pageContext: { pages } } = props

  const artists = pages.filter(page =>
    page.frontmatter.template === 'artist' &&
    page.frontmatter.expose &&
    page.frontmatter.works.length
  )

  return (
    <Layout {...props}>
      <div css={Artists.styles.element}>
        {artists.map(artist => (
          <article key={artist.relativePath} css={Artists.styles.article}>
            <Artist {...artist} />
          </article>
        ))}
      </div>
    </Layout>
  )
}

Artists.styles = {
  element: {
    flex: 1,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 16em)',
    gridGap: '2rem',
    justifyContent: 'space-between',
    padding: '2em',
  },
  article: {
    height: '16em',
    width: '16em',
  },
}

export default Artists
