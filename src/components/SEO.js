import React from 'react'
import { Helmet } from 'react-helmet'
import { fromFilesystem2S3 } from 'utils/resolve'

const SEO = ({ title, description, type, image, pageContext }) => {
  const img = [
    pageContext.site.siteMetadata.siteUrl,
    fromFilesystem2S3(image),
  ].join('')

  return (
    <Helmet>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta name='google' content='notranslate' />
      <meta name="description" content={description} />
      {!!image && <meta name="image" content={img} />}

      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={pageContext.site.siteMetadata.title} />
      <meta property="og:type" content={type || 'website'} />
      {!!image && <meta property="og:image" content={img} />}
      <meta property="og:url" content={`${pageContext.site.siteMetadata.siteUrl}${pageContext.url}`} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content="fr_FR" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {!!image && <meta name="twitter:image" content={img} />}
    </Helmet>
  )
}

export default SEO
