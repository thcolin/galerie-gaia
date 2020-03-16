import React from 'react'
import Layout from 'components/Layout'
import Artist from 'components/Artist'
import theme from 'theme'

const Artists = ({ ...props }) => {
  const { pageContext: { pages, frontmatter } } = props

  const artists = frontmatter.artists
    .map(artist => pages.find(page => page.base === artist.artist.split('/').pop()))
    .filter(page =>
      page &&
      page.frontmatter.expose &&
      page.frontmatter.works.filter(work => !work.sold).length
    )

  return (
    <Layout {...props}>
      <section css={Artists.styles.element}>
        <div css={Artists.styles.grid}>
          {artists.map(artist => (
            <article key={artist.relativePath} css={Artists.styles.article}>
              <Artist {...artist} />
            </article>
          ))}
        </div>
      </section>
    </Layout>
  )
}

Artists.styles = {
  element: {
    flex: 1,
    padding: '2em',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 16em)',
    gridGap: '2rem',
    justifyContent: 'space-between',
    [theme.medias.small]: {
      justifyContent: 'center',
    },
    [theme.medias.medium]: {
      justifyContent: 'center',
    },
  },
  article: {
    height: '16em',
    width: '16em',
  },
}

export default Artists
