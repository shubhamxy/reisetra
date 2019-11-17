import React from 'react'
import gql from 'graphql-tag'
import styled from '@emotion/styled'
import { Query } from 'react-apollo'
import { GoMarkGithub } from 'react-icons/go'

import { Subheading, Text } from './AreaTypography'
import OpenRecommendationsList from './OpenRecommendationsList'
import { Button as BaseButton } from '../shared/Buttons'
import { spacing } from '../../utils/styles'

const OpenRecommendationsRoot = styled(`div`)`
  margin-top: ${spacing[`2xl`]}px;
`

const Button = styled(BaseButton)`
  margin: ${spacing.lg}px 0 ${spacing.xl}px 0;
`

const GitHubRecommendationFragment = gql`
  fragment GitHubRecommendationFragment on GitHubRecommendation {
    id
    title
    url
    number
    labels {
      name
      url
    }
  }
`

const GITHUB_LABEL = `status: help wanted`

const GET_OPEN_ISSUES = gql`
  query($label: String!) {
    openRecommendations(label: $label) {
      totalRecommendations
      issues {
        ...GitHubRecommendationFragment
      }
    }
  }
  ${GitHubRecommendationFragment}
`

const filterClaimedRecommendations = issue =>
  !issue.labels.map(label => label.name).includes(`Hacktoberfest - Claimed`)

const OpenRecommendations = () => (
  <Query query={GET_OPEN_ISSUES} variables={{ label: GITHUB_LABEL }}>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading...</p>
      if (error) return <p>Error: {error.message}</p>

      const issues = data.openRecommendations.issues
        .filter(filterClaimedRecommendations)
        .slice(0, 5)

      return (
        <OpenRecommendationsRoot>
          <Subheading>Recommendations We Could Use Your Help With</Subheading>
          <OpenRecommendationsList issues={issues} />
          <Button inverse href="/contact">
            See more issues on <GoMarkGithub />
          </Button>
        </OpenRecommendationsRoot>
      )
    }}
  </Query>
)

export default OpenRecommendations
