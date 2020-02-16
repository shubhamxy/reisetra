import React from 'react';
import styled from '@emotion/styled';
import { graphql, StaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import ProductListing from '../ProductListing';

import { breakpoints, colors, fonts, spacing } from '../../utils/styles';

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

const ProductListingHeaderRoot = styled(`header`)`
  display: flex;
  flex-direction: column;
  padding: ${spacing.lg}px;
  text-align: center;
  justify-content: space-between;

  .ant-carousel .slick-slide {
    width: 80vw;
    align-self: center;
    text-align: center;
    height: 30vh;
    line-height: 160px;
    background: ${colors.lightest};
    overflow: hidden;
  }
  @media (min-width: ${breakpoints.desktop}px) {
    .ant-carousel .slick-slide {
      text-align: center;
      height: 40vh;
      width: 80vw;
      line-height: 160px;
      background: ${colors.lightest};
      overflow: hidden;
    }
  }
`;

const Title = styled(`h1`)`
  color: ${colors.brandDark};
  font-family: ${fonts.heading};
  font-size: 1.8rem;
  letter-spacing: -0.02em;
  line-height: 1;
  margin: 0;

  margin-top: ${spacing['3xl']}px;

  @media (min-width: ${breakpoints.desktop}px) {
    font-size: 1.6rem;
  }
`;

const Intro = styled(`p`)`
  color: ${colors.text};
  font-size: 1rem;
  line-height: 1.4;
  margin-top: ${spacing['xs']}px;
  margin-bottom: ${spacing['3xl']}px;
  justify-content: center;
  align-self: center;
  @media (min-width: ${breakpoints.desktop}px) {
    font-size: 1rem;
    line-height: 1.6;
    padding-left: 20%;
    padding-right: 20%;
  }
`;

const ProductListingHeader = () => {
  return (
    <StaticQuery
      query={graphql`
        query CarousalProductListing {
          file(relativePath: { eq: "banner.jpg" }) {
            childImageSharp {
              fixed(width: 720, height: 400) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      `}
      render={({ file }) => {
        return (
          <ProductListingContainer>
            <ProductListingHeaderRoot>
              <Image
                style={{
                  maxWidth: '80vw',
                  maxHeight: '100vh',
                  justifyContent: 'center',
                  alignSelf: 'center'
                }}
                fixed={file.childImageSharp.fixed}
                objectFit="center"
                alt="Reisetra Crafts"
              />

              <Title>Authentic Indian Handcrafts</Title>
              <Intro>
                Our Exclusive line of furniture is a well-balanced collection of
                designs ranging from rustic to eclectic, from antique to
                contemporary, well proportioned and durable for today's casual
                chic lifestyles. It is imbued with style and strength, resulting
                in an affordable piece to furnish one's home.Reisetra has
                achieved a remarkable reputation in the manufacturing &
                exporting of premium quality wooden products and we are here to
                satisfy your design needs.
              </Intro>
              <ProductListing />
            </ProductListingHeaderRoot>
          </ProductListingContainer>
        );
      }}
    />
  );
};

export default ProductListingHeader;
