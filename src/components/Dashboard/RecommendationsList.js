import React from 'react';
import styled from '@emotion/styled';
import { colors, radius, spacing } from '../../utils/styles';
import gql from 'graphql-tag';

const RecommendationList = styled('ul')`
  list-style: none;
  margin: 1rem 0 0;
  padding: 0;
`;

const Recommendation = styled('li')`
  border-bottom: 1px solid ${colors.brandLight};
  margin: 0;
  padding: 0.5rem 0;

  :last-child:not(:first-of-type) {
    border-bottom: 0;
  }
`;

const RecommendationTitle = styled('span')`
  border-bottom: 1px solid ${colors.lightest};
  transition: 200ms border-color linear;
`;

const RecommendationId = styled('span')`
  color: ${colors.textLighter};
  transition: 200ms color linear;
`;

const RecommendationLink = styled('a')`
  background-color: ${colors.lightest};
  color: ${colors.darkest};
  display: block;
  padding: ${spacing.xs}px 0 ${spacing.sm}px;
  text-decoration: none;
  transition: 200ms color linear;

  :active,
  :focus,
  :hover {
    color: ${colors.brand};

    ${RecommendationTitle} {
      border-bottom-color: ${colors.brand};
    }

    ${RecommendationId} {
      color: ${colors.lilac};
    }
  }
`;

const Label = styled('a')`
  background-color: ${colors.brandLight};
  border: 1px solid ${colors.brandLight};
  border-radius: ${radius.default}px;
  box-sizing: border-box;
  color: ${colors.textLight};
  display: inline-block;
  font-size: 0.75rem;
  line-height: 1;
  margin: 0 ${spacing.xs}px ${spacing.xs}px 0;
  padding: ${spacing['2xs']}px ${spacing.xs}px;
  text-decoration: none;
  transition: 200ms all linear;

  :active,
  :focus,
  :hover {
    border-color: ${colors.lilac};
    color: ${colors.brand};
  }
`;

const formatLabelUrl = url => {
  const urlParts = url.split('/');
  const organization = urlParts[4];
  const repository = urlParts[5];
  const label = urlParts.slice(-1)[0];

  return `/contact`;
};

export const GitHubRecommendationFragment = gql`
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
`;

export default ({ issues }) => (
  <RecommendationList>
    {issues.map(issue => (
      <Recommendation key={issue.id}>
        <RecommendationLink href={issue.url}>
          <RecommendationTitle>{issue.title}</RecommendationTitle>{' '}
          <RecommendationId>#{issue.url.split('/').pop()}</RecommendationId>
        </RecommendationLink>
        {issue.labels.map(({ url, name }) => (
          <Label href={formatLabelUrl(url)} key={`${issue.id}-${url}`}>
            {name}
          </Label>
        ))}
      </Recommendation>
    ))}
  </RecommendationList>
);
