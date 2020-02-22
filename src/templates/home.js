import React, { useState, useEffect } from 'react'
import { css } from 'emotion'
import Layout from 'components/Layout'
import Image from 'components/Image'
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import resolve from 'utils/resolve'

const Home = ({ ...props }) => {
  const [ready, setReady] = useState(false)
  const { frontmatter, pages } = props.pageContext
  const carousel = frontmatter.carousel
    .map(relation => pages.filter(
      page => page.relativePath === resolve.fromFilesystem2Gatsby(relation.work, { extension: true })).pop()
    )
    .filter(work => work)

  useEffect(() => {
    setReady(true)
  }, [])

  return (
    <Layout {...props}>
      <div
        css={Home.styles.element}
        style={{
          opacity: ready ? 1 : 0,
        }}
      >
        <CarouselProvider
          isPlaying
          infinite
          interval={5000}
          touchEnabled={false}
          dragEnabled={false}
          totalSlides={carousel.length}
          className={css(Home.styles.carousel)}
        >
          <Slider>
            {carousel.map((work, index) => (
              <Slide key={index} className={css(Home.styles.work)}>
                <Image src={work.frontmatter.image} />
              </Slide>
            ))}
          </Slider>
        </CarouselProvider>
      </div>
    </Layout>
  )
}

Home.styles = {
  element: {
    height: '100%',
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
  work: {
    img: {
      height: '100%',
      width: '100%',
      objectFit: 'cover',
    },
  },
}

export default Home
