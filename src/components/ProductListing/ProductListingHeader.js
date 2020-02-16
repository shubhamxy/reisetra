import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { graphql, StaticQuery } from 'gatsby';
import Image from 'gatsby-image';

import { breakpoints, colors, fonts, spacing } from '../../utils/styles';
import StackGrid, { transitions, easings } from 'react-stack-grid';
import { Select } from 'antd';
const transition = transitions.scaleDown;

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

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
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
    font-size: 3rem;
  }
`;

const Intro = styled(`p`)`
  color: ${colors.text};
  font-size: 1rem;
  line-height: 1.4;
  margin-top: ${spacing['3xl']}px;
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

const ProductListingHeader = props => {
  return (
    <>
      <ProductListingHeaderRoot>
        <Title>Products</Title>
      </ProductListingHeaderRoot>
    </>
  );
};

export default ProductListingHeader;
