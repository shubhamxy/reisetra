import React from 'react';
import UserContext from '../../context/UserContext';
import DiscountCode from '../DiscountCode/DiscountCode';
import RecommendationList from './RecommendationList';
import { Heading, Subheading, Lede, Text } from '../shared/Typography';

export default () => (
  <UserContext.Consumer>
    {({ customers, loading, profile }) =>
      loading || customers.count > 0 ? (
        <>
          <DiscountCode />
          <Subheading className={loading && 'loading'}>
            Your Most Recent Contribution
          </Subheading>
          <RecommendationList issues={customers.issues.slice(0, 1)} />
        </>
      ) : (
        <>
          <Heading>Hi, @{profile.nickname}!</Heading>
          <Lede>Let’s get you started with your first purchase!</Lede>
          <Text>
            This is your dashboard. Once you’ve had your first purchase from
            Reisetra, you can come back here to{' '}
            <strong>claim free coupons.</strong>
          </Text>
          <Text>
            If you have questions, ask on any issue{' '}
            <a href="/contact">contact us</a>.
          </Text>
        </>
      )
    }
  </UserContext.Consumer>
);
