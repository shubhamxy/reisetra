import React from 'react'
import styled from '@emotion/styled'

import { animations } from '../../utils/styles'

const LoadingRoot = styled(`div`)`
  align-items: center;
  animation: ${animations.simpleEntry};
  display: flex;
  flex-direction: column;
  height: 70vh;
  justify-content: center;
`

const Loading = () => <LoadingRoot>Loading...</LoadingRoot>

export default Loading
