import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import UserContext from '../../context/UserContext'
import { breakpoints, colors } from '../../utils/styles'

const OpenBarRoot = styled(`div`)`
  display: flex;
  flex-direction: row;
  height: 20px;
  padding: 0 10% 0 10%;
  top: 0px;
  position: fixed;
  z-index: 2000;
  background: ${colors.brandLighter};
  width: 100%;
  justify-content: flex-end;
`

const Item = styled(`div`)`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-self: center;
  align-items: center;
  align-content: space-evenly;
`
const Link = styled(`a`)`
  font-size: 10px;
  align-self: center;
  padding-left: 20px;
  color: ${colors.darkest};
`

class OpenBar extends Component {
  state = {
    className: `closed`
  }

  componentDidUpdate(prevProps) {
    // most of code below is similar to CustomerArea, take a look for comments

    const isDesktopViewportChanged =
      this.props.isDesktopViewport !== prevProps.isDesktopViewport
    const areaStatusChanged = prevProps.areaStatus !== this.props.areaStatus
    const imageBrowserStatusChanged =
      this.props.productImagesBrowserStatus !==
      prevProps.productImagesBrowserStatus

    if (isDesktopViewportChanged && prevProps.isDesktopViewport === null) {
      if (this.props.isDesktopViewport) {
        this.setState({ className: `closed` })
      } else {
        this.setState({
          className: /\/product\//.test(this.props.location.pathname)
            ? `closed`
            : `open`
        })
      }
    }

    if (areaStatusChanged) {
      if (this.revertStatus(this.props.areaStatus) === `open`) {
        this.setState({ className: `opening` })
        setTimeout(() => this.setState({ className: `open` }), 500)
      }

      if (this.revertStatus(this.props.areaStatus) === `closed`) {
        this.setState({ className: `closing` })
        setTimeout(() => this.setState({ className: `closed` }), 500)
      }
    }

    if (this.props.isDesktopViewport) {
      if (imageBrowserStatusChanged) {
        if (this.props.productImagesBrowserStatus === `open`) {
          setTimeout(() => {
            this.setState(state => {
              return {
                className: state.className + ` covered`
              }
            })
          }, 500)
        } else {
          this.setState(state => {
            return {
              className: state.className.replace(`covered`, ``)
            }
          })
        }
      }
    }

    // hide bar on product pages on mobile
    if (!this.props.isDesktopViewport) {
      if (this.props.location.pathname !== prevProps.location.pathname) {
        if (/\/product\//.test(this.props.location.pathname)) {
          this.setState(state => {
            return {
              className: state.className + ` hidden`
            }
          })
        } else {
          this.setState(state => {
            return {
              className: `open`
            }
          })
        }
      }
    }
  }

  revertStatus = status => {
    if (status === `open`) {
      return `closed`
    } else if (status === `closed`) {
      return `open`
    } else {
      return status
    }
  }

  render() {
    const { onClick, areaStatus } = this.props
    const { className } = this.state

    return (
      <UserContext.Consumer>
        {({ customer }) => (
          <OpenBarRoot className={className}>
            <Item>
              <Link href="/contact">Contact Us</Link>
              <Link href="/">Offers</Link>
              <Link href="/">Reviews</Link>
              <Link onClick={onClick}>Menu</Link>
            </Item>
          </OpenBarRoot>
        )}
      </UserContext.Consumer>
    )
  }
}

OpenBar.propTypes = {
  areaStatus: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  isDesktopViewport: PropTypes.bool,
  productImagesBrowserStatus: PropTypes.string
}

export default OpenBar
