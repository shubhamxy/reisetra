require(`dotenv`).config({
  path: `.env.${process.env.NODE_ENV}`
})
const path = require(`path`)

module.exports = {
  siteMetadata: {
    siteUrl: `https://shop.reisetra.co`,
    title: `Reisetra | Authentic Indian Handicraft | Buy Online!`,
    description: `A marketplace for Discovering Unique Indian Products including Handmade, Vintage, Ethnic, Organic and Natural products from India.`
  },
  plugins: [
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/Layout/`)
      }
    },
    `gatsby-transformer-sharp`,
    // {
    //   resolve: 'gatsby-source-shopify',
    //   options: {
    //     shopName: 'reisetra',
    //     accessToken: process.env.SHOPIFY_ACCESS_TOKEN
    //   }
    // },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_API_KEY, // may instead specify via env, see below
        tables: [
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Product Inventory`,
            tableView: `Product Overview`
          }
        ]
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Reisetra Store`,
        short_name: `Reisetra Store`,
        start_url: `/`,
        background_color: `#efefef`,
        theme_color: `#2d5e7b`,
        display: `minimal-ui`,
        icon: `static/android-chrome-512x512.png`
      }
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Source Sans Pro`,
            variants: [`300`, `400`]
          },
          {
            family: `Montserrat`,
            variants: [`300`, `400`]
          }
        ]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: path.join(__dirname, `src`, `assets`)
      }
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `G-2Q8ET2XN0N`,
        respectDNT: true
      }
    },
    `gatsby-plugin-antd`
  ]
}
