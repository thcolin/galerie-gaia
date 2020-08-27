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
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-MLBX757",
        includeInDevelopment: false,
        defaultDataLayer: { platform: "gatsby" },
        // // Specify optional GTM environment details.
        // gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING",
        // gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME",
        // dataLayerName: "YOUR_DATA_LAYER_NAME",  
        // Name of the event that is triggered on every Gatsby route change.
        routeChangeEventName: "gatsby-route-change",
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
          head: true,
          trackingId: 'google19d6c9c3c8a5f3be'
      }
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
