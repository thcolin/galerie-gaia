import SEO from 'components/SEO'
import Layout from 'components/Layout'
import Work from 'components/Work'
import Heading from 'components/Heading'
import theme from 'theme'

const Artists = ({ scrollPosition, ...props }) => {
  const { pageContext: { pages, frontmatter } } = props

  const artists = frontmatter.artists
    .map(artist => pages.find(page => page.base === artist.artist.split('/').pop()))
    .filter(page =>
      page
      && page.frontmatter.expose
      && page.frontmatter.works.some(work => !work.sold)
    )

  return (
    <Layout {...props}>
      <SEO
        title={frontmatter.seo.title}
        description={frontmatter.seo.description}
        image={frontmatter.seo.image || artists[0]?.frontmatter?.works?.filter(work => !work.sold).shift()?.image}
        pageContext={props.pageContext}
      />
      <section css={Artists.styles.element}>
        <Heading>{frontmatter.seo.heading}</Heading>
        <div css={Artists.styles.grid}>
          {artists.map(artist => (
            <article key={artist.relativePath} css={Artists.styles.article}>
              <Work
                title={artist.frontmatter.title}
                image={artist.frontmatter.image || artist.frontmatter.works.filter(work => !work.sold).shift().image}
                url={artist.url}
              />
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
