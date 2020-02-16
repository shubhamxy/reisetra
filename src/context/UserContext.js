import React from 'react';

export const defaultUserContext = {
  loading: false,
  error: false,
  discount: false,
  profile: {},
  customer: {},
  handleLogout: () => {},
  updateCustomer: () => {}
};

export default React.createContext(defaultUserContext);
