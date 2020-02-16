import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';

import InterfaceContext from '../context/InterfaceContext';
import ProductPage from '../components/ProductPage';

const removeCareInstructions = desc =>
  desc.split(/More Information/).slice(0, 1);

const ProductPageTemplate = props => {
  const {
    data: {
      site,
      Product: { data: product },
      Product: { data: Images, Product_Name, Description, Handle }
    },
    location: { pathname }
  } = props;

  const {
    siteMetadata: { siteUrl }
  } = site;

  // const description = removeCareInstructions(fullDescription);

  const image = Images[0] ? Images[0].url : null;
  const canonical = `${siteUrl}${pathname}`;

  return (
    <InterfaceContext.Consumer>
      {({
        isDesktopViewport,
        productImagesBrowserStatus,
        productImageFeatured,
        toggleProductImagesBrowser,
        setCurrentProductImages
      }) => (
        <>
          <Helmet>
            <title>{Product_Name}</title>

            <meta name="description" content={Description} />
            <link rel="canonical" href={canonical} />

            <meta property="og:url" content={`${siteUrl}/product/${Handle}`} />
            <meta property="og:locale" content="en" />
            <meta property="og:Product_Name" content={Product_Name} />
            <meta property="og:site_name" content="Reisetra Craft Store" />
            <meta property="og:description" content={Description} />

            {/* TODO: add the image */}
            <meta property="og:image" content={`${siteUrl}${image}`} />
            <meta property="og:image:alt" content={Product_Name} />
            <meta property="og:image:width" content="600" />
            <meta property="og:image:height" content="600" />

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@shubhamxy" />
          </Helmet>
          {/* <img src={image}></img> */}
          <ProductPage
            product={product}
            isDesktopViewport={isDesktopViewport}
            productImagesBrowserStatus={productImagesBrowserStatus}
            productImageFeatured={productImageFeatured}
            toggleProductImagesBrowser={toggleProductImagesBrowser}
            setCurrentProductImages={setCurrentProductImages}
          />
        </>
      )}
    </InterfaceContext.Consumer>
  );
};

export default ProductPageTemplate;

export const query = graphql`
  query($Handle: String!) {
    site {
      siteMetadata {
        siteUrl
        title
        description
      }
    }
    Product: airtable(data: { Handle: { eq: $Handle } }) {
      data {
        Product_Name
        Handle
        Description
        Selling_Price_Unit
        Images {
          id
          url
          thumbnails {
            large {
              url
              width
              height
            }
          }
        }
      }
    }
  }
`;
