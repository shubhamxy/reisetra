import React from 'react';
import styled from '@emotion/styled';
import { graphql, StaticQuery } from 'gatsby';

import ProductListing from './CarousalProductItem';

import { Carousel, Select } from 'antd';

import { breakpoints, colors, fonts, spacing } from '../../utils/styles';

const ProductSelectRoot = styled(`header`)`
  display: flex;
  flex-direction: column;
  padding: ${spacing.lg}px;
  text-align: center;
  justify-content: space-between;
  margin: 0 auto;
`;

const Title = styled(`h1`)`
  color: ${colors.brandDark};
  font-family: ${fonts.heading};
  font-size: 1.8rem;
  letter-spacing: -0.02em;
  line-height: 1;
  margin: 0;
  margin-top: ${spacing.md}px;

  @media (min-width: ${breakpoints.desktop}px) {
    font-size: 3rem;
  }
`;

const Intro = styled(`p`)`
  color: ${colors.text};
  font-size: 1rem;
  line-height: 1.4;
  margin: 0;
  margin-top: ${spacing.md}px;

  @media (min-width: ${breakpoints.desktop}px) {
    font-size: 1rem;
    line-height: 1.6;
  }
`;
const { Option } = Select;
const ProductSelect = props => (
  <>
    <ProductSelectRoot>
      <Title>Select</Title>
      <Select defaultValue="lucy" onChange={props.handleSelect}>
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="Yiminghe">yiminghe</Option>
      </Select>
    </ProductSelectRoot>
  </>
);

export default ProductSelect;
