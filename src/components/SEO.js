import React from 'react'
import { withPrefix } from 'gatsby'
import { Helmet } from 'react-helmet'

const SEO = ({ title, description, type, image, pageContext }) => {
  const img = [
    pageContext.site.siteMetadata.siteUrl,
    withPrefix((image || '').replace(/^\/forestry/, '/cdn').replace(/\.(png|jpe?g)$/i, match => match.toLowerCase())),
  ].join('')

  return (
    <Helmet>
      <meta name="description" content={description} />
      {!!image && <meta name="image" content={img} />}

      <meta property="og:title" content={title} />
      <meta property="og:type" content={type || 'website'} />
      {!!image && <meta property="og:image" content={img} />}
      <meta property="og:url" content={`${pageContext.site.siteMetadata.siteUrl}${pageContext.url}`} />
      <meta property="og:description" content={description} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {!!image && <meta name="twitter:image" content={img} />}
    </Helmet>
  )
}

export default SEO
