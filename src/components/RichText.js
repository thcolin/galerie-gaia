import React, { createElement } from 'react'
import { Link } from 'gatsby'
import Youtube from 'react-youtube'
import Image from 'components/Image'
import Gallery from 'components/Gallery'
import { getYoutubeId } from 'utils/youtube'
import marksy from 'marksy'

const compile = marksy({
  createElement,
  elements: {
    h1: ({ id, children }) => (
      <h1>{children}</h1>
    ),
    h2: ({ id, children }) => (
      <h2>{children}</h2>
    ),
    h3: ({ id, children }) => (
      <h3>{children}</h3>
    ),
    h4: ({ id, children }) => (
      <h4>{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote>{children}</blockquote>
    ),
    hr: () => (
      <hr />
    ),
    ol: ({ children }) => (
      <ol>{children}</ol>
    ),
    ul: ({ children }) => (
      <ul>{children}</ul>
    ),
    p: ({ children }) => (
      <p>{children}</p>
    ),
    table: ({ children }) => (
      <table>{children}</table>
    ),
    thead: ({ children }) => (
      <thead>{children}</thead>
    ),
    tbody: ({ children }) => (
      <tbody>{children}</tbody>
    ),
    tr: ({ children }) => (
      <tr>{children}</tr>
    ),
    th: ({ children }) => (
      <th>{children}</th>
    ),
    td: ({ children }) => (
      <td>{children}</td>
    ),
    a: ({ children, href, context, ...props }) => {
      if (['mp4'].includes(href.split('.').pop())) {
        return (
          <span style={{ display: 'flex', justifyContent: 'center' }}>
            <video controls={true}>
              <source src={href} />
              Désolé, votre navigateur ne semble pas supporter le format de cette vidéo, essayez d'utiliser un navigauteur récent tel que <a href="https://www.mozilla.org/fr/firefox/new/">Firefx</a>.
            </video>
          </span>
        )
      }

      if (/youtube/.test(href)) {
        return (
          <span style={{ display: 'flex', justifyContent: 'center' }}>
            <Youtube videoId={getYoutubeId(href)} containerClassName="youtubeContainer" />
          </span>
        )
      }

      if (href.charAt(0) === '/') {
        return (
          <Link to={href} {...props}>
            {children}
          </Link>
        )
      }

      return (
        <a href={href} target='_blank' rel='noopener noreferrer' {...props}>
          {children}
        </a>
      )
    },
    strong: ({ children }) => (
      <strong>{children}</strong>
    ),
    em: ({ children }) => (
      <em>{children}</em>
    ),
    br: () => (
      <br />
    ),
    del: ({ children }) => (
      <del>{children}</del>
    ),
    img: ({ src, alt }) => (
      <Image src={src} alt={alt} width='100%' />
    ),
    code: ({ language, code }) => (
      <code language={language}>{code}</code>
    ),
    codespan: ({ children }) => (
      <codespan>{children}</codespan>
    ),
  },
  components: {
    Gallery,
  },
})

const RichText = ({ children, options = {}, ...props }) => (
  <div {...props} css={[RichText.styles.element, props.css]}>
    {compile(children || '', options).tree}
  </div>
)

RichText.styles = {
  element: {
    a: {
      textDecoration: 'underline',
    },
    video: {
      width: '100%',
      maxWidth: '20rem',
    }
  },
}

export default RichText
