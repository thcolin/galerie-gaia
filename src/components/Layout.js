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
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    minHeight: '100vh',
    minWidth: '100vw',
    backgroundColor: 'green',
    [theme.medias.small]: {
      flexDirection: 'column',
    },
  },
  navigation: {
    display: 'flex',
    [theme.medias.small]: {
      maxWidth: '100%',
    },
    [theme.medias.medium]: {
      maxWidth: '20em',
    },
    [theme.medias.large]: {
      maxWidth: '20em',
    },
  },
  container: {
    display: 'flex',
    flex: 1,
  },
}

export default Layout
