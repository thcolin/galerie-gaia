import Snipcart from './components/Snipcart'

const Html = (props) => {
  return (
    <html {...props.htmlAttributes} lang="fr">
      <head>
        {props.headComponents}
        <link rel="preconnect" href="https://app.snipcart.com" />
        <link rel="preconnect" href="https://cdn.snipcart.com" />
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <noscript key='noscript' id='gatsby-noscript'>
          This app works best with JavaScript enabled.
        </noscript>
        <div key='body' id='___gatsby' dangerouslySetInnerHTML={{ __html: props.body }} />
        {props.postBodyComponents}
      </body>
      <Snipcart />
    </html>
  )
}

export default Html
