import React from 'react'

const Logo = ({ title, caption, ...props }) => (
  <div css={Logo.styles.element}>
    <h1>{title}</h1>
    <small>{caption}</small>
  </div>
)

Logo.styles = {
  element: {
    h1: {
      margin: 0,
      fontSize: '3.5em',
      lineHeight: 1,
      textAlign: 'left',
      letterSpacing: '0.125em',
    },
    small: {
      display: 'block',
      padding: '1em 0 0',
      fontSize: '1em',
      textAlign: 'left',
    },
  },
}

export default Logo
