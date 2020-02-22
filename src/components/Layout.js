import React from 'react'
import { Helmet } from 'react-helmet'
import Navigation from 'components/Navigation'
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
      <meta name='viewport' content='width=device-width, initialScale=1.0' />
      <meta name='google' content='notranslate' />
    </Helmet>
    <div css={Layout.styles.element}>
      <div css={Layout.styles.navigation}>
        <Navigation {...props} />
      </div>
      <div css={Layout.styles.container}>
        {children}
      </div>
    </div>
  </>
)

Layout.styles = {
  element: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
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
    [theme.medias.large]: {
      maxWidth: '20em',
    },
    [theme.medias.extralarge]: {
      maxWidth: '20em',
    },
  },
  container: {
    display: 'flex',
    flex: 1,
    overflowY: 'scroll',
    maxWidth: '100%',
  },
}

export default Layout
