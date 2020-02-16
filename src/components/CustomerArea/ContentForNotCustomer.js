import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Button as BaseButton } from '../shared/Buttons';
import OpenRecommendations from './OpenRecommendations';
import { Heading, Lede, Text } from './AreaTypography';
import { spacing, animations } from '../../utils/styles';

const ContentForNotCustomerRoot = styled(`div`)`
  animation: ${animations.simpleEntry};
`;

const Button = styled(BaseButton)`
  margin: ${spacing.lg}px 0 ${spacing.xl}px 0;
`;

class ContentForNotCustomer extends Component {
  state = {
    issuesVisible: false
  };

  showRecommendationsList = () => {
    this.setState({
      issuesVisible: true
    });
  };

  render() {
    const { issuesVisible } = this.state;
    const {
      profile: { nickname }
    } = this.props;

    return (
      <ContentForNotCustomerRoot>
        <Heading>Hi, @{nickname}!</Heading>
        <Lede>Let’s get you started with your first purchase on Reisetra!</Lede>
        <Text>
          Once you’ve had your first purchase from Reisetra, you can come back
          here to claim free coupons.
        </Text>
        <Text>
          If you have questions, or any issue <a href="/contact/">contact us</a>
          .
        </Text>
        {/* {!issuesVisible ? (
          <>
            <Text>
              Click the button below for issues that we could use help with.
            </Text>
            <Button onClick={this.showRecommendationsList} inverse>
              Explore Open Recommendations
            </Button>
          </>
        ) : (
          <OpenRecommendations />
        )} */}
      </ContentForNotCustomerRoot>
    );
  }
}

ContentForNotCustomer.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ContentForNotCustomer;
