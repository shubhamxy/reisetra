import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import styled from '@emotion/styled'
import Image from 'gatsby-image'

import { colors, radius } from '../../utils/styles'

const CartThumbnailRoot = styled(Image)`
  border: 1px solid ${colors.brandLight};
  border-radius: ${radius.default}px;
  height: 36px;
  width: 36px;
`

const CartThumbnail = ({ images, id: imageId, fallback, ...imageProps }) => {
  const image = images.find(({ id }) => id === imageId)

  if (image) {
    imageProps.src = image.url
    imageProps.width = `64px`
    imageProps.height = `64px`
  } else {
    imageProps.src = fallback
  }

  return <CartThumbnailRoot fixed={imageProps} />
}

export default props => (
  <StaticQuery
    query={graphql`
      {
        allAirtable {
          edges {
            node {
              data {
                Images {
                  url
                  id
                }
              }
            }
          }
        }
      }
    `}
    render={({ allAirtable: { edges } }) => {
      const images = edges
        .map(({ node }) => (node.data.Images ? node.data.Images[0] : null))
        .reduce((acc, val) => (val ? acc.concat(val) : acc), [])
      console.log(`aaa`, images)

      return <CartThumbnail images={images} {...props} />
    }}
  />
)
