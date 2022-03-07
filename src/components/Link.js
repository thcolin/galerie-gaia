import { Link as GatsbyLink } from 'gatsby'

const Link = ({ children, to, activeClassName, partiallyActive, ...other }) => /^\/(?!\/)/.test(to) ? (
  <GatsbyLink to={to} activeClassName={activeClassName} partiallyActive={partiallyActive} {...other}>
    {children}
  </GatsbyLink>
) : (
  <a href={to} target="_blank" rel="noopener noreferrer" {...other}>
    {children}
  </a>
)

export default Link
