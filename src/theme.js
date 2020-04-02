const colors = {
  white: '#ffffff',
  black: '#1A1A1A',
  silver: '#fefefe',
  grey: '#CCCCCC',
  gray: '#3A3A3A',
  shadow: 'rgba(0, 0, 0, 0.5)',
}

const fonts = {
  primary: '"Walkway Regular", sans-serif',
  secondary: '"Merriweather", sans-serif',
  default: '"Montserrat", sans-serif',
}

const breakpoints = [768, 992, 1200]

const medias = {
  small: `@media only screen and (max-width: ${breakpoints[0] - 1}px)`,
  medium: `@media only screen and (min-width: ${breakpoints[0]}px) and (max-width: ${breakpoints[1] - 1}px)`,
  large: `@media only screen and (min-width: ${breakpoints[1]}px) and (max-width: ${breakpoints[2] - 1}px)`,
  extralarge: `@media only screen and (min-width: ${breakpoints[2]}px)`,
}

const resets = {
  a: {
    color: 'inherit',
    textDecoration: 'none',
    ':hover:not(:disabled)': {
      cursor: 'pointer',
    },
  },
  button: {
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none',
    padding: 0,
    background: 'none',
    color: 'inherit',
    fontSize: '100%',
    fontFamily: 'inherit',
    lineHeight: 1,
    border: 'none',
    ':not(:disabled)': {
      cursor: 'pointer',
    },
  },
  select: {
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none',
    lineHeight: 1.6,
    background: 'none',
    border: 'none',
    outline: 'none',
    ':not(:disabled)': {
      cursor: 'pointer',
    },
  },
  input: {
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none',
    padding: 0,
    background: 'none',
    fontSize: '100%',
    fontFamily: 'inherit',
    lineHeight: 1.6,
    border: 'none',
    width: '100%',
    outline: 'none',
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '1em',
    width: '1em',
    border: '0.075em solid white',
    borderRadius: '0.125em',
    '&:not(:disabled)': {
      cursor: 'pointer',
    },
    '&:checked': {
      '&:before': {
        content: 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMTczLjg5OCA0MzkuNDA0bC0xNjYuNC0xNjYuNGMtOS45OTctOS45OTctOS45OTctMjYuMjA2IDAtMzYuMjA0bDM2LjIwMy0zNi4yMDRjOS45OTctOS45OTggMjYuMjA3LTkuOTk4IDM2LjIwNCAwTDE5MiAzMTIuNjkgNDMyLjA5NSA3Mi41OTZjOS45OTctOS45OTcgMjYuMjA3LTkuOTk3IDM2LjIwNCAwbDM2LjIwMyAzNi4yMDRjOS45OTcgOS45OTcgOS45OTcgMjYuMjA2IDAgMzYuMjA0bC0yOTQuNCAyOTQuNDAxYy05Ljk5OCA5Ljk5Ny0yNi4yMDcgOS45OTctMzYuMjA0LS4wMDF6Ij48L3BhdGg+PC9zdmc+)',
        display: 'block',
        margin: '-100% 0 0 0',
        padding: '0.2em',
        height: '1em',
        width: '1em',
      },
      '&:not(:disabled):before': {
        cursor: 'pointer',
      },
    },
  },
  radio: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '1em',
    width: '1em',
    border: '0.075em solid white',
    borderRadius: '50%',
    '&:not(:disabled)': {
      cursor: 'pointer',
    },
    '&:checked': {
      '&:before': {
        content: 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMTczLjg5OCA0MzkuNDA0bC0xNjYuNC0xNjYuNGMtOS45OTctOS45OTctOS45OTctMjYuMjA2IDAtMzYuMjA0bDM2LjIwMy0zNi4yMDRjOS45OTctOS45OTggMjYuMjA3LTkuOTk4IDM2LjIwNCAwTDE5MiAzMTIuNjkgNDMyLjA5NSA3Mi41OTZjOS45OTctOS45OTcgMjYuMjA3LTkuOTk3IDM2LjIwNCAwbDM2LjIwMyAzNi4yMDRjOS45OTcgOS45OTcgOS45OTcgMjYuMjA2IDAgMzYuMjA0bC0yOTQuNCAyOTQuNDAxYy05Ljk5OCA5Ljk5Ny0yNi4yMDcgOS45OTctMzYuMjA0LS4wMDF6Ij48L3BhdGg+PC9zdmc+)',
        display: 'block',
        margin: '-100% 0 0 0',
        padding: '0.2em',
        height: '1em',
        width: '1em',
        '&:not(:disabled):before': {
          cursor: 'pointer',
        },
      },
    },
  },
}

export default {
  colors,
  fonts,
  breakpoints,
  medias,
  resets,
}
