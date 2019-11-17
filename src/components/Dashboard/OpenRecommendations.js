import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Subheading, Text } from '../shared/Typography'
import RecommendationList, {
  GitHubRecommendationFragment
} from './RecommendationList'

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

export default () => (
  <Query query={GET_OPEN_ISSUES} variables={{ label: GITHUB_LABEL }}>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading...</p>
      if (error) return <p>Error: {error.message}</p>

      const issues = data.openRecommendations.issues
        .filter(filterClaimedRecommendations)
        .slice(0, 5)

      return (
        <React.Fragment>
          <Subheading>Popular Produt recommended for you!</Subheading>
          <RecommendationList issues={issues} />
          <Text>
            <a href={`/contact`}>contact us for any details.</a>
          </Text>
        </React.Fragment>
      )
    }}
  </Query>
)
