import React from 'react'
import { Link } from 'gatsby'
import Image from 'components/Image'
import useHover from 'hooks/use-hover'
import theme from 'theme'

const Artist = ({ url, frontmatter, ...props }) => {
  const [hoverRef, isHovered] = useHover()

  return (
    <Link to={url} css={Artist.styles.element} ref={hoverRef}>
      <Image src={frontmatter.works.filter(work => !work.sold).shift().image} />
      <span
        css={Artist.styles.overlay}
        style={{
          transform: `translateY(${isHovered ? '0%' : '-100%'})`,
        }}
      >
        {frontmatter.title}
      </span>
      <label>{frontmatter.title}</label>
    </Link>
  )
}

Artist.styles = {
  element: {
    position: 'relative',
    display: 'block',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    '>span': {
      [theme.medias.small]: {
        height: 'calc(100% - 3rem)',
      },
      '>img': {
        objectFit: 'cover',
      },
    },
    '>label': {
      display: 'none',
      textAlign: 'center',
      fontWeight: 600,
      padding: '1rem',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      [theme.medias.small]: {
        display: 'block',
      }
    }
  },
  overlay: {
    [theme.medias.small]: {
      display: 'none',
    },
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    margin: 0,
    padding: '2em',
    backgroundColor: theme.colors.shadow,
    color: theme.colors.white,
    fontSize: '1.25em',
    fontWeight: 600,
    textAlign: 'center',
    lineHeight: 1.5,
    transition: 'transform 300ms ease-in-out',
  },
  image: {
    objectFit: 'cover',
  },
}

export default Artist
