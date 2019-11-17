import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import ProductImagesMobile from './ProductImagesMobile'
import ProductImagesDesktop from './ProductImagesDesktop'
import ProductSpecs from './ProductSpecs'
import ProductForm from './ProductForm'
import BackLink from './BackLink'
import { DiscussionEmbed } from 'disqus-react'

import { breakpoints, spacing } from '../../utils/styles'

const ProductPageRoot = styled(`div`)`
  padding-bottom: ${spacing.md}px;

  @media (min-width: ${breakpoints.desktop}px) {
    align-items: center;
    display: flex;
    justify-content: center;
    min-height: 100vh;
    padding: ${spacing[`3xl`]}px;
    width: 100%;
  }
`

const Container = styled(`div`)`
  @media (min-width: ${breakpoints.desktop}px) {
    align-items: flex-start;
    display: flex;
  }
`

const DisqusContainer = styled(`div`)`
  padding: 40px;
  padding-left: 180px;
  padding-right: 180px;
`

const Details = styled(`div`)`
  position: relative;

  @media (min-width: ${breakpoints.desktop}px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: -${spacing.xl}px;
    max-width: 400px;
    min-height: 490px;
  }
`

class ProductPage extends Component {
  componentDidMount() {
    const images = this.props.product.Images
    this.props.setCurrentProductImages(images)
  }

  render() {
    const {
      product,
      product: { Handle, Images }
    } = this.props

    const {
      isDesktopViewport,
      productImageFeatured,
      toggleProductImagesBrowser
    } = this.props

    const disqusConfig = {
      shortname: `reisetra`,
      config: { identifier: Handle, title: product.Product_Name }
    }

    return (
      <>
        <ProductPageRoot>
          <Container>
            {!isDesktopViewport ? (
              <ProductImagesMobile
                images={Images}
                imageOnClick={toggleProductImagesBrowser}
              />
            ) : (
              <ProductImagesDesktop
                images={Images}
                imageOnClick={toggleProductImagesBrowser}
                imageFeatured={productImageFeatured}
              />
            )}
            <Details>
              <BackLink>Back to Product List</BackLink>
              <ProductSpecs product={this.props.product} />
              <ProductForm id={Handle} variants={[this.props.product]} />
            </Details>
          </Container>
        </ProductPageRoot>
        <DisqusContainer>
          <DiscussionEmbed {...disqusConfig} />
        </DisqusContainer>
      </>
    )
  }
}

ProductPage.propTypes = {
  product: PropTypes.object.isRequired,
  productImagesBrowserStatus: PropTypes.string.isRequired,
  toggleProductImagesBrowser: PropTypes.func.isRequired,
  setCurrentProductImages: PropTypes.func.isRequired,
  productImageFeatured: PropTypes.object,
  isDesktopViewport: PropTypes.bool
}

export default ProductPage
