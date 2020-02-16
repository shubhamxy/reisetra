import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import Image from 'gatsby-image';

import { MdShoppingCart, MdArrowForward } from 'react-icons/md';
import UserContext from '../../context/UserContext';

import {
  removeCareInstructions,
  cutDescriptionShort
} from '../../utils/helpers';

import {
  breakpoints,
  colors,
  fonts,
  radius,
  spacing,
  animations
} from '../../utils/styles';

const DESCRIPTION_LIMIT = 90;
const TRANSITION_DURATION = '250ms';

const ProductListingItemLink = styled(Link)`
  background: ${colors.brandBright};
  margin-bottom: ${spacing.lg}px;
  overflow: hidden;
  text-decoration: none;
  transition: all ${TRANSITION_DURATION};

  @media (min-width: ${breakpoints.tablet}px) {
    margin-left: auto;
    margin-right: auto;
    max-width: 500px;
  }

  @media (min-width: ${breakpoints.desktop}px) {
    flex-basis: 300px;
    justify-content: center;
    margin: ${spacing.md}px;
  }

  @media (hover: hover) {
    :hover {
      background: ${colors.brandLighter};
    }
  }
`;

const Item = styled(`article`)`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${spacing.lg}px;
`;

const Preview = styled(`div`)`
  margin: -${spacing.lg}px;
  margin-bottom: ${spacing.lg}px;
  overflow: hidden;
  position: relative;

  .gatsby-image-wrapper {
    transition: all ${TRANSITION_DURATION};
  }

  @media (hover: hover) {
    ${ProductListingItemLink}:hover & {
      .gatsby-image-wrapper {
        transform: scale(1.1);
      }
    }
  }
`;

const CodeEligibility = styled(`div`)`
  align-items: stretch;
  animation: ${animations.simpleEntry};
  border-radius: ${radius.default}px;
  bottom: 0;
  color: ${colors.lightest};
  display: flex;
  left: ${spacing.lg}px;
  overflow: hidden;
  position: absolute;
  right: ${spacing.lg}px;

  span {
    align-items: center;
    display: flex;
    height: 30px;
    justify-content: center;
  }

  span:first-of-type {
    background: #999;
    flex-basis: 35%;
    font-size: 0.9rem;
  }

  span:last-child {
    background: ${props =>
      props.freeWith === 'SHOPPINGSPREE' ? colors.tuscan : colors.brand};
    color: ${props =>
      props.freeWith === 'SHOPPINGSPREE' ? colors.brand : colors.tuscan};
    flex-basis: 65%;
    font-family: ${fonts.heading};
    font-size: 1rem;
  }
`;

const Name = styled(`h1`)`
  color: ${colors.brandDark};
  font-family: ${fonts.heading};
  font-size: 1rem;
  line-height: 1.2;
  margin: 0;
`;

const Description = styled(`p`)`
  color: ${colors.text};
  flex-grow: 1;
  font-size: 1rem;
  line-height: 1.5;
`;

const PriceRow = styled(`div`)`
  display: flex;
  justify-content: space-between;
  margin-top: ${spacing.xs}px;
`;

const Price = styled(`div`)`
  color: ${colors.darkest};
  font-size: 1rem;
  font-weight: normal;
  letter-spacing: -0.02em;

  span {
    font-size: 1rem;
    color: ${colors.darkest};
  }
`;

const Incentive = styled('div')`
  align-items: center;
  color: ${colors.lilac};
  display: flex;
  margin-bottom: ${spacing['2xs']}px;
  margin-right: calc(-${spacing.lg}px - 40px);
  text-align: right;
  color: ${colors.darkest};
  transition: all ${TRANSITION_DURATION};
  font-size: 1rem;

  @media (hover: hover) {
    ${ProductListingItemLink}:hover & {
      transform: translateX(-40px);
    }
  }
  span {
    font-size: 1rem;
  }

  > span {
    svg {
      display: inline;
      margin-right: -${spacing['3xs']}px;
      vertical-align: middle;
      font-size: 1rem;
    }
  }
`;

const CartIcon = styled(`span`)`
  align-items: center;
  background: ${colors.tuscan};
  border-radius: ${radius.default}px 0 0 ${radius.default}px;
  display: flex;
  height: 40px;
  justify-content: center;
  margin-left: ${spacing.lg}px;
  position: relative;
  transition: all ${TRANSITION_DURATION};
  vertical-align: middle;
  width: 40px;

  @media (hover: hover) {
    ${ProductListingItemLink}:hover & {
      margin-left: ${spacing.xs}px;
    }
  }

  svg {
    color: ${colors.accent};
    height: 22px;
    position: relative;
    width: 22px;
  }
`;

const checkEligibility = ({ customer, freeWith }) => {
  const { shopify } = customer;

  let eligibleCodes = [];

  if (shopify && shopify.codes) {
    eligibleCodes = shopify.codes.filter(
      code => code.code === freeWith && code.used === false
    );
  }

  return eligibleCodes.length ? true : false;
};

const ProductListingItem = props => {
  const {
    product: { Product_Name, Handle, Description, Selling_Price_Unit, Images }
  } = props;

  const price = Selling_Price_Unit;
  const aspectRatio =
    Images[0].thumbnails.large.height / Images[0].thumbnails.large.width;
  const height = 200;
  const primeImg = { src: Images[0].url, width: height / aspectRatio, height };

  return (
    <UserContext.Consumer>
      {({ customer }) => {
        return (
          <ProductListingItemLink to={`/product/${Handle}`}>
            <Item>
              <Preview>
                <Image fixed={primeImg} />
              </Preview>
              <Name>{Product_Name}</Name>
              <PriceRow>
                <Price>
                  <span>₹ </span>
                  {price}
                </Price>
                <Incentive>
                  <span>
                    View details
                    <br />& buy <MdArrowForward />
                  </span>
                  <CartIcon>
                    <MdShoppingCart />
                  </CartIcon>
                </Incentive>
              </PriceRow>
            </Item>
          </ProductListingItemLink>
        );
      }}
    </UserContext.Consumer>
  );
};

ProductListingItem.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductListingItem;
