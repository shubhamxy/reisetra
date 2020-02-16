import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import CloseBar from './CloseBar';
import OpenBar from './OpenBar';
import ContentContainer from './ContentContainer';
import { breakpoints, colors, dimensions } from '../../utils/styles';

const {
  customerAreaWidth: { openDesktop: desktopMaxWidth, openHd: hdMaxWidth },
  sidebarWidth
} = dimensions;

const CustomerAreaRoot = styled(`aside`)`
  background: ${colors.brandLight};
  color: ${colors.darkest};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  right: 0;
  bottom: 0;
  min-height: 100vh;
  position: fixed;
  top: 0;
  transform: translateX(100%);
  transition: 0.75s ease;
  width: ${sidebarWidth};
  will-change: all;
  z-index: 100;

  &.opening {
    transform: translateX(0%);
  }
  &.open {
    width: 100vw;
    display: flex;
    transform: translateX(0%);
  }
  &.closing {
    transform: translateX(100%);
  }
  &.closed {
    display: none;
    transform: translateX(100%);
    &.unhide {
      transform: translateX(0%);
    }
  }

  @media (min-width: ${breakpoints.desktop}px) {
    height: calc(100vh - ${dimensions.headerHeight});
    width: ${sidebarWidth};
    &.opening {
      transform: translateX(0%);
    }
    &.open {
      display: flex;
      transform: translateX(0%);
      width: ${sidebarWidth};
    }
    &.closing {
      transform: translateX(${sidebarWidth});
    }
    &.closed {
      display: none;
      transform: translateX(${sidebarWidth});

      &.unhide {
        transform: translateX(0%);
      }
    }

    &.covered {
      display: none;
    }
  }
  }
`;

class CustomerArea extends Component {
  state = {
    className: 'closed',
    issuesVisible: false
  };

  componentDidUpdate(prevProps) {
    const isDesktopViewportChanged =
      this.props.isDesktopViewport !== prevProps.isDesktopViewport;
    const componentStatusChanged = prevProps.status !== this.props.status;
    const imageBrowserStatusChanged =
      this.props.productImagesBrowserStatus !==
      prevProps.productImagesBrowserStatus;

    // set inital status of the component after isDesktopViewport is set for the first time (value changes from null to true/false)
    if (isDesktopViewportChanged && prevProps.isDesktopViewport === null) {
      this.setState({
        className: this.props.isDesktopViewport ? 'open' : 'closed'
      });
    }

    // apply transitions after changes of the component's status, trigerred by user (toggleCustomerArea)
    if (componentStatusChanged) {
      if (this.props.status === 'open') {
        // before we start opening the component we first have to unhide it
        this.setState({
          className: `${this.state.className} unhide`
        });
        setTimeout(
          () =>
            this.setState({
              className: 'opening'
            }),
          0
        );
        setTimeout(
          () =>
            this.setState({
              className: 'open'
            }),
          750
        );
      }

      if (this.props.status === 'closed') {
        this.setState({
          className: 'closing'
        });
        setTimeout(
          () =>
            this.setState({
              className: 'closed'
            }),
          750
        );
      }
    }

    // for desktop viewport, hide all content when ProductImagesBrowser is open
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
            className: state.className.replace('covered', '')
          }));
        }
      }
    }
  }

  showRecommendations = e => {
    this.setState({ issuesVisible: true });
  };
  componentDidMount() {
    // this.props.t
  }
  render() {
    const {
      location,
      status,
      toggle,
      isDesktopViewport,
      productImagesBrowserStatus
    } = this.props;
    const { className } = this.state;

    return (
      <>
        <CustomerAreaRoot className={className}>
          <ContentContainer />
          <CloseBar
            areaStatus={status}
            onClick={toggle}
            isDesktopViewport={isDesktopViewport}
            productImagesBrowserStatus={productImagesBrowserStatus}
          />
        </CustomerAreaRoot>
        <OpenBar
          areaStatus={status}
          isDesktopViewport={isDesktopViewport}
          onClick={toggle}
          location={location}
          productImagesBrowserStatus={productImagesBrowserStatus}
        />
      </>
    );
  }
}

CustomerArea.propTypes = {
  status: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
  isDesktopViewport: PropTypes.bool,
  productImagesBrowserStatus: PropTypes.string
};

export default CustomerArea;
