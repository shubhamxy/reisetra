import React from 'react'
import { navigate } from 'gatsby'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { MdArrowBack } from 'react-icons/md'

import { Button } from '../shared/Buttons'

import { spacing } from '../../utils/styles'

const BackLinkRoot = styled(`div`)`
  bottom: 0;
  left: 0;
  background: transparent;
  padding: ${spacing.xl}px ${spacing.md}px ${spacing.md}px 0;
  position: sticky;
  top: 60px;
  width: 100%;
`

const BackToProduct = styled(Button)`
  width: auto;
`

const goBack = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const fromProduct = urlParams.has(`fromProduct`)
  fromProduct ? history.back() : navigate(`/`)
}

const BackButton = ({ children, className }) => (
  <BackLinkRoot className={className}>
    <BackToProduct onClick={goBack}>
      <MdArrowBack /> {children}
    </BackToProduct>
  </BackLinkRoot>
)

BackButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

export default BackButton
