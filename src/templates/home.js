import React, { useState, useEffect, useMemo } from 'react'
import SEO from 'components/SEO'
import { css } from 'emotion'
import Layout from 'components/Layout'
import Image from 'components/Image'
import Heading from 'components/Heading'
import Work from 'components/Work'
import isMobile from 'is-mobile'
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'

const Home = ({ ...props }) => {
  const { pageContext: { pages, frontmatter } } = props
  const carousel = frontmatter.carousel

  const [ready, setReady] = useState(false)
  useEffect(() => {
    setReady(true)
  }, [])

  const article = useMemo(() => pages.find(page => page.frontmatter.template === 'blog').frontmatter.articles[0], [])
  const selection = useMemo(() => pages.find(page => page.frontmatter.template === 'artist' && page.frontmatter.fields.includes('Séléction')), [])

  return (
    <Layout {...props}>
      <SEO
        title={frontmatter.seo.title}
        description={frontmatter.seo.description}
        image={carousel[0]?.image}
        pageContext={props.pageContext}
      />
      <section
        css={Home.styles.element}
        style={{
          opacity: ready ? 1 : 0,
        }}
      >
        <Heading>{frontmatter.seo.heading}</Heading>
        <CarouselProvider
          isPlaying
          infinite
          interval={isMobile() ? 3000 : 5000}
          touchEnabled={false}
          dragEnabled={false}
          totalSlides={carousel.length}
          className={css(Home.styles.carousel)}
        >
          <Slider>
            {carousel.map((slide, index) => (
              <Slide key={index} className={css(Home.styles.slide)}>
                <Image src={slide.image} />
              </Slide>
            ))}
          </Slider>
        </CarouselProvider>
      </section>
      <div css={Home.styles.works}>
        <Work
          title={article.title}
          image={article.image}
          url="/actualites"
        />
        <Work
          title={selection.frontmatter.title}
          image={selection.frontmatter.works[1].image}
          url={selection.url}
          state={{ work: selection.frontmatter.works[1].title }}
        />
        <Work
          title="Inspiration"
          image="/forestry/assets-inspiration.jpg"
          url="/inspiration"
        />
      </div>
    </Layout>
  )
}

Home.styles = {
  element: {
    height: '80vh',
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
    margin: '0 1em',
    '>a': {
      margin: '2em 1em',
      height: '256px',
      width: '256px',
    }
  },
}

export default Home
