import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { Button } from '../shared/Buttons';

import { colors, spacing, animations } from '../../utils/styles';
import { Avatar, Popover } from 'antd';

const LogoutBarRoot = styled(`div`)`
  align-items: center;
  animation: ${animations.simpleEntry};
  display: flex;
  justify-content: space-between;
  .avatar:hover {
    border: 2px solid ${colors.accent};
  }
`;

const Info = styled(`div`)`
  color: ${colors.brandLight};
  font-size: 1rem;
  padding-right: 1.5rem;
  b {
    color: ${colors.lightest};
    font-weight: normal;
    displays: block;
    font-size: 1rem;
  }
`;

const Logout = styled(Button)`
  flex-grow: 0;
  padding: ${spacing.xs}px ${spacing.sm}px;
`;

const LogoutBar = ({ error, handleOnClick, loading, profile, handleLogout }) =>
  !loading && !error ? (
    <LogoutBarRoot>
      <Info />
      <Avatar
        size={'large'}
        className="avatar"
        src={profile.picture}
        onClick={handleOnClick}
      />
    </LogoutBarRoot>
  ) : null;

LogoutBar.propTypes = {
  error: PropTypes.any.isRequired,
  handleLogout: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  profile: PropTypes.object.isRequired
};

export default LogoutBar;
