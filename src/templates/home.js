import React from 'react'
import { css } from 'emotion'
import Layout from 'components/Layout'
import Image from 'components/Image'
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import theme from 'theme'

const Home = ({ ...props }) => {
  const { frontmatter, pages } = props.pageContext
  const carousel = frontmatter.carousel
    .map(relation => pages.filter(
      page => page.relativePath === relation.work.replace(/src\/pages\//, '')).pop()
    )
    .filter(work => work)

  return (
    <Layout {...props}>
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
    img: {
      height: '100%',
      width: '100%',
      objectFit: 'cover',
    },
  },
}

export default Home
