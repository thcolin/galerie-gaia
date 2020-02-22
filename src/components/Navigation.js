import React, { useState } from 'react'
import { css } from 'emotion'
import Logo from 'components/Logo'
import Icon from 'components/Icon'
import RichText from 'components/RichText'
import AnimateHeight from 'react-animate-height'
import { Link } from 'gatsby'
import theme from 'theme'

const Navigation = ({ pageContext, ...props }) => {
  const [open, setOpen] = useState(false)

  return (
    <div css={Navigation.styles.element}>
      <div css={Navigation.styles.header}>
        <div css={Navigation.styles.logo}>
          <Logo
            title={pageContext.site.siteMetadata.title}
            caption={pageContext.site.siteMetadata.caption}
          />
        </div>
        <div css={Navigation.styles.toggle}>
          <button css={theme.resets.button} onClick={() => setOpen(!open)}>
            <Icon children={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
      <AnimateHeight duration={500} height={open ? 'auto' : 0} className={css(Navigation.styles.container)}>
        <div css={Navigation.styles.body}>
          <div css={Navigation.styles.list}>
            <ul>
              <li><Link to='/'>Accueil</Link></li>
              <li><Link to='/artists'>Artistes</Link></li>
              <li><Link to='/expositions'>Expositions</Link></li>
              <li><Link to='/about'>Prestations</Link></li>
              <li><Link to='/contact'>Contact</Link></li>
            </ul>
          </div>
          <RichText css={Navigation.styles.paragraph}>
            {pageContext.site.siteMetadata.announcement}
          </RichText>
          <RichText css={Navigation.styles.paragraph}>
            {pageContext.site.siteMetadata.opening}
          </RichText>
          <div css={Navigation.styles.contact}>
            <a href={`tel:${pageContext.site.siteMetadata.phone}`}>
              {pageContext.site.siteMetadata.phone}
            </a>
            <br />
            <a href={`mailto:${pageContext.site.siteMetadata.email}`}>
              {pageContext.site.siteMetadata.email}
            </a>
            <br />
            <Link to='/sitemap'>plan du site</Link>
          </div>
        </div>
      </AnimateHeight>
    </div>
  )
}

Navigation.styles = {
  element: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    padding: '1em 2em',
    overflow: 'hidden',
    backgroundColor: theme.colors.white,
    textAlign: 'center',
    overflowY: 'auto',
    fontFamily: theme.fonts.primary,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '>div': {
      marginTop: '1rem',
      marginBottom: '1rem',
    },
  },
  logo: {
    fontSize: '0.75em',
    [theme.medias.large]: {
      fontSize: '1em',
    },
    [theme.medias.extralarge]: {
      fontSize: '1em',
    },
  },
  toggle: {
    fontSize: '2em',
    marginLeft: '2rem',
    [theme.medias.large]: {
      display: 'none',
    },
    [theme.medias.extralarge]: {
      display: 'none',
    },
  },
  container: {
    [theme.medias.large]: {
      height: 'inherit !important',
      overflow: 'inherit !important',
      flex: 1,
      '>div': {
        display: 'block !important',
        height: '100%',
      },
    },
    [theme.medias.extralarge]: {
      height: 'inherit !important',
      overflow: 'inherit !important',
      flex: 1,
      '>div': {
        display: 'block !important',
        height: '100%',
      },
    },
  },
  body: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    '>div': {
      margin: '1em',
    },
  },
  list: {
    '>ul': {
      listStyleType: 'none',
      textAlign: 'left',
      padding: 0,
      margin: '0 3em',
      '>li': {
        margin: '0 0 0.5em',
        fontSize: '1.25em',
        textAlign: 'center',
        lineHeight: '1.5em',
        textTransform: 'uppercase',
        [theme.medias.large]: {
          textAlign: 'left',
        },
        [theme.medias.extralarge]: {
          textAlign: 'left',
        },
      },
    },
  },
  paragraph: {
    fontSize: '1.25em',
    lineHeight: '1.5em',
  },
  contact: {
    fontSize: '1.25em',
    lineHeight: '1.5em',
  },
}

export default Navigation
