import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import styled from '@emotion/styled';

import ProductListingHeader from './ProductListingHeader';
import ProductListingItem from './ProductListingItem';

import { breakpoints, spacing } from '../../utils/styles';

const ProductListingContainer = styled(`div`)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${spacing.lg}px;

  @media (min-width: ${breakpoints.desktop}px) {
    flex-direction: row;
    flex-wrap: wrap;
    padding: ${spacing['2xl']}px;
  }
`;

const ProductListing = () => (
  <StaticQuery
    query={graphql`
      query ProductListingQuery {
        products: allAirtable {
          edges {
            node {
              data {
                _
                Handle
                Product_Name
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
        }
      }
    `}
    render={({ products }) => (
      <>
        {/* <ProductListingHeader /> */}
        <ProductListingContainer>
          {products.edges.map(item => {
            if (!(item.node.data.Images && item.node.data.Images[0]))
              return null;
            const product = item.node.data;
            return (
              <ProductListingItem key={product.Handle} product={product} />
            );
          })}
        </ProductListingContainer>
      </>
    )}
  />
);

export default ProductListing;
