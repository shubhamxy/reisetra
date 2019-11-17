import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import Image from 'gatsby-image'

import { MdShoppingCart, MdArrowForward } from 'react-icons/md'
import UserContext from '../../context/UserContext'

import { breakpoints, colors, fonts, radius, spacing } from '../../utils/styles'

const TRANSITION_DURATION = `250ms`

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
`

const Item = styled(`article`)`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${spacing.lg}px;
`

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
`

const Name = styled(`h1`)`
  color: ${colors.brandDark};
  font-family: ${fonts.heading};
  font-size: 1rem;
  line-height: 1.2;
  margin: 0;
`

const PriceRow = styled(`div`)`
  display: flex;
  justify-content: space-between;
  margin-top: ${spacing.xs}px;
`

const Price = styled(`div`)`
  color: ${colors.darkest};
  font-size: 1rem;
  font-weight: normal;
  letter-spacing: -0.02em;

  span {
    font-size: 1rem;
    color: ${colors.darkest};
  }
`

const Incentive = styled(`div`)`
  align-items: center;
  color: ${colors.lilac};
  display: flex;
  margin-bottom: ${spacing[`2xs`]}px;
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
      margin-right: -${spacing[`3xs`]}px;
      vertical-align: middle;
      font-size: 1rem;
    }
  }
`

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
`

const ProductListingItem = props => {
  const {
    product: { Product_Name, Handle, Selling_Price_Unit, Images }
  } = props

  const price = Selling_Price_Unit
  const aspectRatio =
    Images[0].thumbnails.large.height / Images[0].thumbnails.large.width
  const height = 200
  const primeImg = { src: Images[0].url, width: height / aspectRatio, height }

  return (
    <UserContext.Consumer>
      {() => (
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
      )}
    </UserContext.Consumer>
  )
}

ProductListingItem.propTypes = {
  product: PropTypes.object.isRequired
}

export default ProductListingItem
