const Html = (props) => {
  return (
    <html {...props.htmlAttributes}>
      <head>{props.headComponents}</head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <noscript key='noscript' id='gatsby-noscript'>
          This app works best with JavaScript enabled.
        </noscript>
        <div key='body' id='___gatsby' dangerouslySetInnerHTML={{ __html: props.body }} />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

export default Html
