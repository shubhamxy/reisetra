import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { breakpoints, colors, fonts, spacing } from '../../utils/styles';

const ProductSpecsRoot = styled(`div`)`
  padding: 0 ${spacing.md}px;

  @media (min-width: ${breakpoints.tablet}px) {
    padding: ${spacing['2xl']}px ${spacing.xl}px 0;
  }
`;

const Name = styled(`h1`)`
  color: ${colors.brandDark};
  font-family: ${fonts.heading};
  font-size: 1rem;
  font-weight: normal;
  margin: 0;
`;

const Description = styled(`p`)`
  color: ${colors.text};
  font-size: 1rem;
  line-height: 1.2;
`;

const Price = styled(`div`)`
  color: ${colors.brand};
  font-size: 1rem;
  font-weight: normal;
  span {
    font-size: 1rem;
    color: ${colors.textLight};
  }
`;

const removeCareInstructions = desc =>
  desc.split(/More Information/).slice(0, 1);

const ProductSpecs = props => {
  const {
    product: { Product_Name, Selling_Price_Unit }
  } = props;
  const description = props.product.Description || '';
  return (
    <ProductSpecsRoot>
      <Name>{Product_Name && Product_Name}</Name>
      <Description>{description}</Description>
      <Price>₹ {Selling_Price_Unit && Selling_Price_Unit}</Price>
    </ProductSpecsRoot>
  );
};

ProductSpecs.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductSpecs;
