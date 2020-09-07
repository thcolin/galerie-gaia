import React, { useState, useEffect } from 'react'
import SEO from 'components/SEO'
import { css } from 'emotion'
import Layout from 'components/Layout'
import Image from 'components/Image'
import isMobile from 'is-mobile'
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'

const Home = ({ ...props }) => {
  const { pageContext: { frontmatter } } = props
  const carousel = frontmatter.carousel

  const [ready, setReady] = useState(false)
  useEffect(() => {
    setReady(true)
  }, [])

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
        <h1>{frontmatter.seo.title}</h1>
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
    </Layout>
  )
}

Home.styles = {
  element: {
    height: '100%',
    width: '100%',
    transition: 'opacity ease-in-out 400ms',
    '>h1': {
      position: 'absolute',
      height: 0,
      width: 0,
      opacity: 0,
    }
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
}

export default Home
