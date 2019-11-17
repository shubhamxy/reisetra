import React from 'react'
import styled from '@emotion/styled'

import UserContext from '../../context/UserContext'
import ContentForNotLoggedIn from './ContentForNotLoggedIn'
import ContentForLoggedIn from './ContentForLoggedIn'

import { breakpoints, colors, spacing, dimensions } from '../../utils/styles'

const ContentContainerRoot = styled(`div`)`
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
  padding: ${spacing.lg}px;
  padding-bottom: calc(${spacing.lg}px + ${dimensions.customerAreaBarHeight});

  @media (min-width: ${breakpoints.desktop}px) {
    padding: ${spacing.xl}px;
    padding-bottom: calc(${spacing.xl}px + ${dimensions.customerAreaBarHeight});

    ::-webkit-scrollbar {
      height: 6px;
      width: 6px;
    }
    ::-webkit-scrollbar-thumb {
      background: ${colors.scrollbar};
    }
    ::-webkit-scrollbar-thumb:hover {
      background: ${colors.sidebar};
    }
    ::-webkit-scrollbar-track {
      background: ${colors.sidebar};
    }
  }
`

const ContentContainer = () => (
  <ContentContainerRoot>
    <UserContext.Consumer>
      {({
        customer,
        error,
        handleLogout,
        loading,
        profile,
        profile: { nickname }
      }) =>
        nickname || loading ? (
          <ContentForLoggedIn
            customer={customer}
            error={error}
            handleLogout={handleLogout}
            loading={loading}
            profile={profile}
          />
        ) : (
          <>
            <ContentForNotLoggedIn />
          </>
        )
      }
    </UserContext.Consumer>
  </ContentContainerRoot>
)

export default ContentContainer
