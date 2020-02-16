import React from 'react'
import { css } from 'emotion'
import Layout from 'components/Layout'
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import theme from 'theme'

const Home = ({ ...props }) => {
  const carousel = props.pageContext.frontmatter.carousel
    .map(relation => props.pageContext.pages.filter(
      page => page.relativePath === relation.work.replace(/src\/pages\//, '')).pop()
    )
    .filter(work => work)

  return (
    <Layout {...props}>
      <CarouselProvider
        isPlaying
        totalSlides={carousel.length}
        className={css(Home.styles.carousel)}
      >
        <Slider>
          {carousel.map((work, index) => (
            <Slide key={index}>
              <img src={work.frontmatter.image} css={Home.styles.work} />
            </Slide>
          ))}
        </Slider>
      </CarouselProvider>
    </Layout>
  )
}

Home.styles = {
  carousel: {
    height: '100%',
    width: '100%',
    [theme.medias.small]: {
      height: 'auto',
    },
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
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
}

export default Home
