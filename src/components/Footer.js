import Icon from 'components/Icon'
import theme from 'theme'
import Cart from './Cart'

const Footer = ({ pageContext, ...props }) => (
  <footer css={Footer.styles.element}>
    <div>
      <Cart />
    </div>
    <p>
      {pageContext.site.siteMetadata.opening}
    </p>
    <a href={`tel:${pageContext.site.siteMetadata.phone}`} style={{ whiteSpace: 'nowrap' }}>
      {pageContext.site.siteMetadata.phone}
    </a>
    <br />
    <a href={`mailto:${pageContext.site.siteMetadata.email}`} style={{ whiteSpace: 'nowrap' }}>
      {pageContext.site.siteMetadata.email}
    </a>
    <div>
      <a href={pageContext.site.siteMetadata.instagram} target='_blank' rel='noopener noreferrer'><Icon children='instagram' /></a>
      <a href={pageContext.site.siteMetadata.facebook} target='_blank' rel='noopener noreferrer'><Icon children='facebook' /></a>
    </div>
  </footer>

)

Footer.styles = {
  element: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    '>*': {
      padding: '0.25em 0',
    },
    '>a': {
      fontSize: '0.875em',
    },
    '>div': {
      '>a': {
        padding: '0 0.5em',
      },
    },
    [theme.medias.large]: {
      position: 'fixed',
      flexDirection: 'row',
      bottom: 0,
      left: 0,
      width: '100%',
      '>*': {
        padding: '0 1em',
      },
    },
    [theme.medias.extralarge]: {
      position: 'fixed',
      flexDirection: 'row',
      bottom: 0,
      left: 0,
      width: '100%',
      '>*': {
        padding: '0 1em',
      },
    },
  },
}

export default Footer
