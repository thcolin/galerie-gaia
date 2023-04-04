import { useState, useEffect } from 'react'
import Logo from 'components/Logo'
import Icon from 'components/Icon'
import RichText from 'components/RichText'
import Footer from 'components/Footer'
import { Link } from 'gatsby'
import trapScroll from 'utils/trapScroll'
import theme from 'theme'

const Navigation = ({ pageContext, ...props }) => {
  const [open, _setOpen] = useState(false)
  const [submenu, _setSubmenu] = useState(typeof sessionStorage !== 'undefined' && sessionStorage.getItem('submenu') === 'true')

  const setOpen = (value) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    _setOpen(value)
    setTimeout(() => trapScroll(value), 500)
  }

  const setSubmenu = (value) => {
    event.preventDefault()
    sessionStorage.setItem('submenu', value)
    _setSubmenu(value)
  }

  useEffect(() => {
    return () => trapScroll(false)
  })

  return (
    <div css={Navigation.styles.element}>
      <header css={Navigation.styles.header}>
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
      </header>
      <div css={Navigation.styles.container} style={open ? { height: 'calc(100vh - 100%)' } : {}}>
        <div css={Navigation.styles.body}>
          <nav css={Navigation.styles.nav}>
            <ol css={Navigation.styles.list}>
              <li><Link to='/' activeStyle={{ textDecoration: 'underline' }}>Accueil</Link></li>
              <li><Link to='/catalogue/' activeStyle={{ textDecoration: 'underline' }}>Catalogue</Link></li>
              <li><Link to='/artists/' activeStyle={{ textDecoration: 'underline' }}>Artistes</Link></li>
              <li><Link to='/actualites/' activeStyle={{ textDecoration: 'underline' }}>Actualités</Link></li>
              <li><Link to='/le-lieu/' activeStyle={{ textDecoration: 'underline' }}>Le Lieu</Link></li>
              <li>
                <details css={Navigation.styles.details} open={submenu}>
                  <summary onClick={() => setSubmenu(!submenu)}>Studio</summary>
                  <ol css={Navigation.styles.list}>
                    {pageContext.pages
                      .filter(page => page.relativeDir === 'about')
                      .sort((a, b) => a.frontmatter.index - b.frontmatter.index)
                      .map((page, index) => (
                        <li key={index}><Link to={page.url} activeStyle={{ textDecoration: 'underline' }}>{page.frontmatter.seo.heading}</Link></li>
                      ))
                    }
                  </ol>
                </details>
              </li>
            </ol>
          </nav>
          <div css={Navigation.styles.announcement}>
            <RichText css={Navigation.styles.paragraph}>
              {pageContext.site.siteMetadata.announcement}
            </RichText>
          </div>
          <Footer pageContext={pageContext} />
        </div>
      </div>
    </div>
  )
}

Navigation.styles = {
  element: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    textAlign: 'center',
    fontFamily: theme.fonts.primary,
    letterSpacing: '0.1em',
    [theme.medias.small]: {
      justifyContent: 'center',
      maxHeight: '100vh',
    },
    [theme.medias.medium]: {
      justifyContent: 'center',
      maxHeight: '100vh',
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    padding: '1em 2em',
    backgroundColor: theme.colors.white,
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
    '>button': {
      background: 'none !important',
      border: 'none !important',
    }
  },
  container: {
    [theme.medias.small]: {
      overflowY: 'auto',
      height: 0,
      transition: 'height ease-in-out 400ms',
      position: 'absolute',
      top: '100%',
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 1,
    },
    [theme.medias.medium]: {
      overflowY: 'auto',
      height: 0,
      transition: 'height ease-in-out 400ms',
      position: 'absolute',
      top: '100%',
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 1,
    },
    [theme.medias.large]: {
      flex: 1,
      overflowY: 'auto',
      margin: '0 0 3.25em',
    },
    [theme.medias.extralarge]: {
      flex: 1,
      overflowY: 'auto',
      margin: '0 0 3.25em',
    },
  },
  body: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    padding: '0 2em 1em 2em',
    backgroundColor: theme.colors.white,
    [theme.medias.small]: {
      minHeight: 'unset',
    },
    [theme.medias.medium]: {
      minHeight: 'unset',
    },
    '>div': {
      margin: '1rem',
    },
  },
  nav: {
    margin: '2rem 3em 0',
  },
  list: {
    listStyleType: 'none',
    textAlign: 'left',
    padding: 0,
    '>li': {
      margin: '0 0 0.5em',
      textAlign: 'center',
     fontSize: '1.25em',
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
  details: {
    '>summary': {
      display: 'block',
      cursor: 'pointer',
      ':hover': {
        textDecoration: 'underline',
      },
      '::-webkit-details-marker': {
        display: 'none',
      },
    },
    '>ol': {
      margin: '1em 0 1em 1em',
      fontSize: '0.75rem',
    },
  },
  paragraph: {
    lineHeight: '1.5',
    '>p': {
      fontSize: '1.125rem',
      margin: 0,
    },
  },
  announcement: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  contact: {
    fontSize: '1.25em',
    lineHeight: '1.5em',
  },
}

export default Navigation
