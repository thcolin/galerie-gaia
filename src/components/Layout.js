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
      <div css={Layout.styles.container}>
        <aside css={Layout.styles.navigation}>
          <Navigation {...props} />
        </aside>
        <div css={Layout.styles.wrapper}>
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
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    width: '100vw',
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
    [theme.medias.large]: {
      maxWidth: '20em',
      minHeight: '100vh',
    },
    [theme.medias.extralarge]: {
      maxWidth: '20em',
      minHeight: '100vh',
    },
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    maxWidth: '100%',
    [theme.medias.large]: {
      overflowY: 'auto',
    },
    [theme.medias.extralarge]: {
      overflowY: 'auto',
    },
  },
}

export default Layout
