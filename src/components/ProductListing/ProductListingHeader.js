import React from 'react'
import styled from '@emotion/styled'

import { breakpoints, colors, fonts, spacing } from '../../utils/styles'

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
`

const Title = styled(`h1`)`
  color: ${colors.brandDark};
  font-family: ${fonts.heading};
  font-size: 1.8rem;
  letter-spacing: -0.02em;
  line-height: 1;
  margin: 0;

  margin-top: ${spacing[`3xl`]}px;

  @media (min-width: ${breakpoints.desktop}px) {
    font-size: 3rem;
  }
`

const ProductListingHeader = () => (
  <>
    <ProductListingHeaderRoot>
      <Title>Products</Title>
    </ProductListingHeaderRoot>
  </>
)

export default ProductListingHeader
