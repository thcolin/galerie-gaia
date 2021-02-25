import { ClassNames } from '@emotion/react'
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import isMobile from 'is-mobile'
import Image from 'components/Image'

const Carousel = ({ slides, ...props }) => (
  <ClassNames>
    {({ css }) => (
      <CarouselProvider
        isPlaying
        infinite
        interval={isMobile() ? 3000 : 5000}
        touchEnabled={false}
        dragEnabled={false}
        totalSlides={slides.length}
        className={css(Carousel.styles.element)}
      >
        <Slider>
          {slides.map((slide, index) => (
            <Slide key={index} className={css(Carousel.styles.slide)}>
              <Image src={slide.image} />
            </Slide>
          ))}
        </Slider>
      </CarouselProvider>
    )}
  </ClassNames>
)

Carousel.styles = {
  element: {
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

export default Carousel
