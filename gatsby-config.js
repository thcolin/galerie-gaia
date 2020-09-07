module.exports = {
  siteMetadata: require('./site-metadata.json'),
  plugins: [
    'gatsby-plugin-sitemap',
    'gatsby-plugin-resolve-src',
    'gatsby-plugin-react-helmet',
    'gatsby-source-data',
    'gatsby-plugin-robots-txt',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: ['gatsby-remark-component'],
      },
    },
    {
      resolve: 'gatsby-remark-page-creator',
      options: {},
    },
    'gatsby-redirect-from',
    'gatsby-plugin-meta-redirect',
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        googleAnalytics: {
          cookieName: 'gatsby-gdpr-google-analytics',
          trackingId: 'google19d6c9c3c8a5f3be'
        },
        googleTagManager: {
          cookieName: 'gatsby-gdpr-google-tagmanager',
          trackingId: 'GTM-MLBX757',
          defaultDataLayer: { platform: "gatsby" },
        },
        environments: ['production']
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Galerie Gaïa',
        short_name: 'Galerie Gaïa',
        start_url: '/',
        background_color: 'white',
        theme_color: 'white',
        display: 'standalone',
        icon: 'src/images/favicon.png',
        crossOrigin: 'use-credentials',
      },
    },
  ],
}
