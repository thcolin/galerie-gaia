import { Link } from 'gatsby'

const Breadcrumb = ({ location, crumbs, current, ...props }) => (
  <nav class='breadcrumb'>
    <ul>
      {crumbs.map(({ crumbLabel, pathname }, index, arr) => (
        <li>
          {index === (arr.length - 1) ? (
            <span>{current || crumbLabel}</span>
          ) : (
            <Link to={pathname}>{crumbLabel}</Link>
          )}
        </li>
      ))}
    </ul>
  </nav>
)

export default Breadcrumb
