import React from 'react'
import { Helmet } from 'react-helmet'
import Navigation from 'components/Navigation'
import Consent from 'components/Consent'
import theme from 'theme'
import 'normalize.css/normalize.css'
import 'assets/css'

const Layout = ({ children, ...props }) => (
  <>
    <Helmet>
      <title>
        {[
          props.pageContext.frontmatter.title,
          props.pageContext.site.siteMetadata.title,
        ].filter(s => s).join(' - ')}
      </title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta name='google' content='notranslate' />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content={props.pageContext.site.siteMetadata.title} />
    </Helmet>
    <div css={Layout.styles.element}>
      <div css={Layout.styles.container}>
        <aside css={Layout.styles.navigation}>
          <Navigation {...props} />
        </aside>
        <div css={Layout.styles.wrapper}>
          <Consent />
          {children}
        </div>
      </div>
    </div>
  </>
)

Layout.styles = {
  element: {
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    minHeight: '100vh',
    maxWidth: '1920px',
    [theme.medias.large]: {
      flexDirection: 'row',
    },
    [theme.medias.extralarge]: {
      flexDirection: 'row',
    },
  },
  navigation: {
    display: 'flex',
    maxWidth: '100%',
    zIndex: 2,
    [theme.medias.large]: {
      position: 'fixed',
      width: '20em',
      height: '100vh',
    },
    [theme.medias.extralarge]: {
      position: 'fixed',
      width: '20em',
      height: '100vh',
    },
  },
  wrapper: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    maxWidth: '100%',
    [theme.medias.large]: {
      paddingLeft: '20em',
    },
    [theme.medias.extralarge]: {
      paddingLeft: '20em',
    },
  },
}

export default Layout
