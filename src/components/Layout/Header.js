import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import Logo from './Logo';
import UserContext from '../../context/UserContext';

import { breakpoints, colors, dimensions, spacing } from '../../utils/styles';
import { Button } from '../shared/Buttons';
import LogoutBar from '../CustomerArea/LogoutBar';
import { login } from '../../utils/auth';

const HeaderRoot = styled('header')`
  background-color: ${colors.brandLight};
  padding-left: ${dimensions.headerHeight};
  padding-right: ${dimensions.headerHeight};
  justify-content: space-around;
  box-sizing: border-box;
  display: ${props => (props.isCovered ? 'none' : 'flex')};
  height: ${dimensions.headerHeight};
  position: fixed;
  width: 100vw;
  top: 20px;
  z-index: 100;
  .navigation {
    display: none;
  }
  box-shadow: 0 2px 2px -2px #fff;

  @media (min-width: ${breakpoints.desktop}px) {
    &.covered {
      display: none;
    }
    &.open {
      display: none;
    }
    .navigation {
      display: flex;
      flex: 1;
      justify-content: center;
      align-self: center;
      margin-left: 2rem;
      margin-right: 2rem;
    }
    .navigation a {
      color: ${colors.darkest};
      text-transform: uppercase;
      font-size: 1rem;
      margin-left: 20px;
      font-weight: normal;
    }
    .navigation a.active {
      color: ${colors.brandDarker};
      font-weight: normal;
    }
  }
`;

const Container = styled(`div`)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: row;
  @media (min-width: ${breakpoints.desktop}px) {
  }
`;

const MainNavigation = styled(`div`)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex: 1 .search {
    flex: 1;
  }
  @media (min-width: ${breakpoints.desktop}px) {
    justify-content: space-between;
    .search {
      flex: 1;
    }
  }
`;

const HomeLink = styled(Link)`
  display: block;
  align-self: center;
  line-height: 1;
`;
const OLink = styled(`a`)`
  display: block;
  align-self: center;
  line-height: 1;
`;
const LogIn = styled(Button)`
  background: ${colors.darkest};
  box-shadow: 0 5px 15px 0 rgba(134, 110, 100, 0.15);
  flex-grow: 0;
  font-size: 1rem;
  border-radius: 4px;
  border: 0;
  padding: ${spacing.xs}px ${spacing.sm}px;
`;

class Header extends Component {
  state = {
    className: ''
  };

  signOut = () => {};

  componentDidUpdate(prevProps) {
    if (this.props.isDesktopViewport) {
      const imageBrowserStatusChanged =
        this.props.productImagesBrowserStatus !==
        prevProps.productImagesBrowserStatus;

      if (imageBrowserStatusChanged) {
        if (this.props.productImagesBrowserStatus === 'open') {
          setTimeout(() => {
            this.setState({
              className: 'covered'
            });
          }, 500);
        } else {
          this.setState({
            className: ''
          });
        }
      }
    }
  }

  render() {
    const { className } = this.state;
    const path = this.props.location.pathname;
    return (
      <HeaderRoot className={className}>
        <Container>
          <HomeLink to="/" aria-label="Home page">
            <Logo />
          </HomeLink>
          <MainNavigation>
            <div className="navigation">
              {/* <Link className={path === '/' ? 'active' : ''} to="/">
                Home
              </Link>
              <Link
                className={path === '/products' ? 'active' : ''}
                to="/products"
              >
                Products
              </Link>
              <OLink
                className={path === '/shop' ? 'active' : ''}
                href="https://reisetra.co"
              >
                Shop
              </OLink> */}
              {/* <Link className={path === '/sales' ? 'active' : ''} to="/sales">
                Sales
              </Link> */}
            </div>
          </MainNavigation>
        </Container>

        <MainNavigation>
          <UserContext.Consumer>
            {({
              error,
              handleLogout,
              loading,
              profile,
              profile: { nickname }
            }) =>
              nickname || loading ? (
                <>
                  <LogoutBar
                    handleOnClick={this.props.toggle}
                    error={error}
                    handleLogout={handleLogout}
                    loading={loading}
                    profile={profile}
                  />
                </>
              ) : (
                <>
                  <LogIn
                    onClick={() => {
                      login();
                    }}
                    inverse
                  >
                    Log In
                  </LogIn>
                </>
              )
            }
          </UserContext.Consumer>
        </MainNavigation>
      </HeaderRoot>
    );
  }
}

Header.propTypes = {
  productImagesBrowserStatus: PropTypes.string.isRequired,
  isDesktopViewport: PropTypes.bool,
  user: PropTypes.any,
  toggle: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};

export default Header;
