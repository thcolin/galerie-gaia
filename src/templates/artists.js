import React from 'react'
import Layout from 'components/Layout'
import Artist from 'components/Artist'
import theme from 'theme'

const Artists = ({ ...props }) => {
  const { pageContext: { pages, frontmatter } } = props
  const selection = frontmatter.artists.map(artist => artist.artist.split('/').pop())

  const artists = pages.filter(page =>
    page.frontmatter.template === 'artist' &&
    page.frontmatter.expose &&
    page.frontmatter.works.filter(work => !work.sold).length &&
    selection.includes(page.base)
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
