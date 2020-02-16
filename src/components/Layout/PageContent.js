import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import Footer from './Footer';
import { breakpoints, dimensions, animations } from '../../utils/styles';

const {
  customerAreaWidth: {
    openDesktop: desktopMaxWidth,
    openHd: hdMaxWidth,
    closedDesktop: desktopMinWidth
  }
} = dimensions;

const PageContentRoot = styled(`main`)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 100vh;
  opacity: 1;
  padding-left: 0;
  padding-right: 0;
  transition: 0.75s;
  width: 100%;
  will-change: transform;

  &.covered {
    opacity: 0;
    position: fixed;
  }

  &.entry {
    animation: ${animations.deadSimpleEntry};
  }

  @media (min-width: ${breakpoints.desktop}px) {
    padding: 80px 0 0 0;
    transform: translateX(0);

    &.wide {
      padding-left: 0;
    }

    &.moved {
      filter: blur(1px);
      position: fixed;
      transform: translateX(-400px);
    }

    &.covered {
      display: none;
    }
  }
`;

const Overlay = styled(`div`)`
  display: none;

  @media (min-width: ${breakpoints.desktop}px) {
    background: rgba(0, 0, 0, 0.1);
    bottom: 0;
    display: block;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
  }
`;

class PageContent extends Component {
  state = {
    className: ''
  };

  componentDidUpdate(prevProps) {
    const imageBrowserStatusChanged =
      this.props.productImagesBrowserStatus !==
      prevProps.productImagesBrowserStatus;
    const customerAreaStatusChanged =
      prevProps.customerAreaStatus !== this.props.customerAreaStatus;
    const cartStatusChanged = prevProps.cartStatus !== this.props.cartStatus;

    if (this.props.isDesktopViewport) {
      if (imageBrowserStatusChanged) {
        if (this.props.productImagesBrowserStatus === 'open') {
          setTimeout(() => {
            this.setState(state => ({
              className: state.className + ' covered'
            }));
          }, 500);
        } else {
          this.setState(state => ({
            className: state.className.replace(' covered', '')
          }));
        }
      }

      if (customerAreaStatusChanged) {
        if (this.props.customerAreaStatus === 'closed') {
          this.setState(state => ({
            className:
              this.props.customerAreaStatus !== 'open'
                ? state.className + ' wide'
                : state.className
          }));
        } else {
          this.setState(state => ({
            className:
              state.className !== 'open'
                ? state.className.replace('wide', '')
                : state.className
          }));
        }
      }

      if (cartStatusChanged) {
        if (this.props.cartStatus === 'open') {
          this.setState(state => ({
            className: state.className + ' moved'
          }));
        } else {
          this.setState(state => ({
            className: state.className.replace('moved', '')
          }));
        }
      }
    } else {
      if (customerAreaStatusChanged || cartStatusChanged) {
        this.setState({
          className:
            this.props.customerAreaStatus === 'open' ||
            this.props.cartStatus === 'open'
              ? 'covered'
              : ''
        });
      }
    }

    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState(state => ({ className: state.className + ' entry' }));

      setTimeout(() => {
        this.setState(state => ({
          className: state.className.replace('entry', '')
        }));
      }, 500);
    }
  }

  render() {
    const { children, cartStatus } = this.props;
    const { className } = this.state;

    return (
      <PageContentRoot className={className}>
        {children}
        {cartStatus === 'open' && <Overlay />}
        <Footer />
      </PageContentRoot>
    );
  }
}

PageContent.propTypes = {
  cartStatus: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  customerAreaStatus: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  productImagesBrowserStatus: PropTypes.string.isRequired,
  isDesktopViewport: PropTypes.bool
};

export default PageContent;
