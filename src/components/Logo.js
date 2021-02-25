import { Link } from 'gatsby'

const Logo = ({ title, caption, ...props }) => (
  <div css={Logo.styles.element}>
    <Link to="/">{title}</Link>
    <small>{caption}</small>
  </div>
)

Logo.styles = {
  element: {
    '>a': {
      display: 'block',
      margin: 0,
      padding: 0,
      fontSize: '3.5em',
      lineHeight: 1,
      textAlign: 'left',
      textDecoration: 'none',
      letterSpacing: '0.125em',
    },
    '>small': {
      display: 'block',
      padding: '1em 0 0',
      fontSize: '1em',
      textAlign: 'left',
    },
  },
}

export default Logo
