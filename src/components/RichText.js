import React, { createElement } from 'react'
import Image from 'components/Image'
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
    a: ({ href, title, target, children }) => (
      <a href={href} title={title} target={target}>
        {children}
      </a>
    ),
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
})

const RichText = ({ children, options = {}, ...props }) => (
  <div {...props} css={[RichText.styles.element, props.css]}>
    {compile(children, options).tree}
  </div>
)

RichText.styles = {
  element: {
    p: {
      margin: 0,
    },
  },
}

export default RichText
