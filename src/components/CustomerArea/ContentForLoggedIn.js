import React from 'react';
import PropTypes from 'prop-types';

import ContentForNotCustomer from './ContentForNotCustomer';
import ContentForCustomerWithNoAccount from './ContentForCustomerWithNoAccount';
import ContentForCustomer from './ContentForCustomer';
import Loading from './Loading';
import Error from './Error';

const ContentFor = ({ customer, error, loading, profile }) => {
  const { shopify, github } = customer;

  if (error) {
    return <Error error={error} />;
  } else if (loading) {
    return <Loading />;
  } else if (github && github.customerCount) {
    if (shopify && shopify.id) {
      return <ContentForCustomer />;
    } else {
      return <ContentForCustomerWithNoAccount />;
    }
  } else {
    return <ContentForNotCustomer profile={profile} />;
  }
};

const ContentForLoggedIn = ({
  customer,
  error,
  handleLogout,
  loading,
  profile
}) => (
  <>
    <ContentFor
      error={error}
      customer={customer}
      handleLogout={handleLogout}
      loading={loading}
      profile={profile}
    />
  </>
);

ContentForLoggedIn.propTypes = {
  customer: PropTypes.object,
  error: PropTypes.any,
  handleLogout: PropTypes.func,
  loading: PropTypes.bool,
  profile: PropTypes.object
};

export default ContentForLoggedIn;
