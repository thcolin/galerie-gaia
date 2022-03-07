import { useState, useEffect, useMemo } from 'react'
import SEO from 'components/SEO'
import Layout from 'components/Layout'
import Carousel from 'components/Carousel'
import Heading from 'components/Heading'
import Work from 'components/Work'
import theme from 'theme'

const Home = ({ ...props }) => {
  const { pageContext: { pages, frontmatter } } = props
  const carousel = frontmatter.carousel

  const [ready, setReady] = useState(false)
  useEffect(() => {
    setReady(true)
  }, [])

  const article = useMemo(() => pages.find(page => page.frontmatter.template === 'blog').frontmatter.articles.slice(-1).pop(), [])
  // const selection = useMemo(() => pages.find(page => page.frontmatter.template === 'artist' && page.frontmatter.fields.includes('Séléction')), [])

  return (
    <Layout {...props}>
      <SEO
        title={frontmatter.seo.title}
        description={frontmatter.seo.description}
        image={carousel[0]?.image}
        pageContext={props.pageContext}
      />
      <section css={Home.styles.element} style={{ opacity: ready ? 1 : 0 }}>
        <Heading>{frontmatter.seo.heading}</Heading>
        <Carousel slides={carousel} />
      </section>
      <section css={Home.styles.works}>
        <Work
          title={article.title}
          image={article.image}
          url="/actualites"
        />
        <Work
          title="Dossier de Presse"
          image="https://galerie-gaia.s3.eu-west-3.amazonaws.com/forestry/assets-presse.jpg"
          url="https://galerie-gaia.s3.eu-west-3.amazonaws.com/forestry/Dossier+de+Presse+-+Galerie+Gai%CC%88a.pdf"
        />
        <Work
          title="Catalogue"
          image="https://galerie-gaia.s3.eu-west-3.amazonaws.com/forestry/assets-catalogue.jpg"
          url="/catalogue"
        />
        {/* {!!selection && (
          <Work
            title={selection.frontmatter.title}
            image={selection.frontmatter.works[1].image}
            url={selection.url}
            state={{ work: selection.frontmatter.works[1].title }}
          />
        )} */}
      </section>
    </Layout>
  )
}

Home.styles = {
  element: {
    height: '70vh',
    width: '100%',
    transition: 'opacity ease-in-out 400ms',
  },
  carousel: {
    height: '100%',
    width: '100%',
    '>div': {
      height: '100%',
      width: '100%',
      '>div': {
        height: '100%',
        width: '100%',
        '>ul': {
          height: '100%',
          width: '100%',
          '>li': {
            height: '100%',
            width: '100%',
          },
        },
      },
    },
  },
  slide: {
    img: {
      height: '100%',
      width: '100%',
      objectFit: 'cover',
    },
  },
  works: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '30%',
    fontSize: '0.875em',
    margin: '2em',
    '>a': {
      margin: '2em 1em',
      height: '256px',
      width: '256px',
    },
    [theme.medias.small]: {
      flexDirection: 'column',
      alignItems: 'center',
      height: 'auto',
    },
  },
}

export default Home
