import React, { useState } from 'react'

const Consent = ({ ...props }) => {
  const [hidden, setHidden] = useState(false)

  if (
    hidden
    || typeof document === 'undefined'
    || document?.cookie?.match(/gatsby-gdpr-google-analytics/)
    || document?.cookie?.match(/gatsby-gdpr-google-tagmanager/)
  ) {
    return null
  }

  return (
    <div css={Consent.styles.element}>
      <p>Nous utilisons des cookies pour nous permettre de mieux comprendre comment le site est utilisé. En continuant à utiliser ce site, vous acceptez cette politique</p>
      <div css={Consent.styles.buttons}>
        <button onClick={() => {
          document.cookie = 'gatsby-gdpr-google-analytics=true;'
          document.cookie = 'gatsby-gdpr-google-tagmanager=true;'
          setHidden(true)
        }}>
          J'accepte
        </button>
        <button onClick={() => {
          document.cookie = 'gatsby-gdpr-google-analytics=false;'
          document.cookie = 'gatsby-gdpr-google-tagmanager=false;'
          setHidden(true)
        }}>
          Je refuse
        </button>
      </div>
    </div>
  )
}

Consent.styles = {
  element: {
    position: 'sticky',
    top: 0,
    background: 'white',
    padding: '1em',
    width: '100%',
    zIndex: 1,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '1em',
    '>button:first-of-type': {
      marginRight: '1em',
    }
  }
}

export default Consent
