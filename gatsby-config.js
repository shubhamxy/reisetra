require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  siteMetadata: {
    siteUrl: 'https://Reisetra.co',
    title: 'Reisetra! Get your crafts here!',
    description:
      'Do you like spaced-out socks? All purple everything? Hitting #maximumcomf with JAMstack Jammies? Oh boy have we got the swag store for you!'
  },
  plugins: [
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/Layout/`)
      }
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-shopify',
      options: {
        shopName: 'reisetra',
        accessToken: process.env.SHOPIFY_ACCESS_TOKEN
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Reisetra Store',
        short_name: 'Reisetra Store',
        start_url: '/',
        background_color: '#efefef',
        theme_color: '#2d5e7b',
        display: 'minimal-ui',
        icon: 'static/android-chrome-512x512.png'
      }
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'G-2Q8ET2XN0N',
        respectDNT: true
      }
    }
  ]
};
