module.exports = {
  pathPrefix: '/galerie-gaia',
  siteMetadata: require('./site-metadata.json'),
  plugins: [
    'gatsby-plugin-sitemap',
    'gatsby-plugin-resolve-src',
    'gatsby-plugin-react-helmet',
    'gatsby-source-data',
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
      options: {

      },
    },
  ],
}
