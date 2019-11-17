import React from 'react'
import { Global, css } from '@emotion/core'
import styled from '@emotion/styled'

import { navigate } from 'gatsby'

import StoreContext, { defaultStoreContext } from '../../context/StoreContext'
import UserContext, { defaultUserContext } from '../../context/UserContext'
import InterfaceContext, {
  defaultInterfaceContext
} from '../../context/InterfaceContext'

import Header from './Header'
import CustomerArea from '../CustomerArea'
import PageContent from './PageContent'
import ProductImagesBrowser from '../ProductPage/ProductImagesBrowser'
import Cart from '../Cart'
import SiteMetadata from '../shared/SiteMetadata'

import { logout, getUserInfo } from '../../utils/auth'
import { breakpoints, colors } from '../../utils/styles'

// Import Futura PT typeface
// import '../../fonts/futura-pt/Webfonts/futurapt_demi_macroman/stylesheet.css';
import gql from 'graphql-tag'

const globalStyles = css`
  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  @media (min-width: ${breakpoints.desktop}px) {
    ::-webkit-scrollbar {
      height: 6px;
      width: 12px;
    }
    ::-webkit-scrollbar-thumb {
      background: ${colors.scrollbar};
    }
    ::-webkit-scrollbar-thumb:hover {
      background: ${colors.lilac};
    }
    ::-webkit-scrollbar-track {
      background: ${colors.brandLight};
    }
  }
  body {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0.05);
    color: ${colors.text};
    font-weight: normal;
    font-family: Source Sans Pro, Montserrat, Open Sans !important;
    font-size: 1rem;
    line-height: 1.4;
    margin: 0 auto;
    background: ${colors.background};
  }
  h1,
  h2,
  h3,
  h4,
  h5 {
    font-family: Source Sans Pro, Montserrat, Open Sans !important;
  }
  p {
    font-family: Montserrat, Open Sans;
    font-size: 1rem;
  }
  div {
    font-family: Montserrat, Open Sans;
    font-size: 1rem;
  }
  b {
    font-family: Montserrat, Open Sans;
    font-size: 1rem;
    font-weight: bold;
  }
  span {
    font-family: Montserrat, Open Sans;
    font-size: 1rem;
  }
  a {
    text-decoration: none;
    font-family: Montserrat, Open Sans;
    font-size: 1rem;
  }
`

const Viewport = styled(`div`)`
  width: 100%;
`

export default class Layout extends React.Component {
  desktopMediaQuery

  state = {
    interface: {
      ...defaultInterfaceContext,
      toggleCart: () => {
        this.setState(state => {
          return {
            interface: {
              ...state.interface,
              customerAreaStatus:
                state.interface.isDesktopViewport === false &&
                state.interface.customerAreaStatus === `open`
                  ? `closed`
                  : state.interface.customerAreaStatus,
              cartStatus:
                this.state.interface.cartStatus === `open` ? `closed` : `open`
            }
          }
        })
      },
      toggleProductImagesBrowser: img => {
        this.setState(state => {
          return {
            interface: {
              ...state.interface,
              productImagesBrowserStatus: img ? `open` : `closed`,
              productImageFeatured: img
                ? img
                : state.interface.productImageFeatured
            }
          }
        })
      },
      featureProductImage: img => {
        this.setState(state => {
          return {
            interface: {
              ...state.interface,
              productImageFeatured: img
            }
          }
        })
      },
      setCurrentProductImages: images => {
        this.setState(state => {
          return {
            interface: {
              ...state.interface,
              currentProductImages: images,
              productImageFeatured: null
            }
          }
        })
      },
      toggleCustomerArea: () => {
        this.setState(state => {
          return {
            interface: {
              ...state.interface,
              customerAreaStatus: this.togglecustomerAreaStatus()
            }
          }
        })
      }
    },
    user: {
      ...defaultUserContext,
      handleLogout: () => {
        this.setState({
          user: {
            ...defaultUserContext,
            loading: false
          }
        })
        logout(() => navigate(`/`))
      },
      updateCustomer: data => {
        this.setState(state => {
          return {
            user: {
              ...state.user,
              customer: data,
              loading: false
            }
          }
        })
      }
    },
    store: {
      ...defaultStoreContext,
      addVariantToCart: (variantId, variant, quantity) => {
        if (variantId === `` || !quantity) {
          console.error(`Both a variantId and quantity are required.`)
          return
        }

        this.setState(state => {
          return {
            store: {
              ...state.store,
              adding: true
            }
          }
        })

        const { checkout, client } = this.state.store
        const checkoutId = checkout.id
        const lineItemsToUpdate = [
          { id: variantId, variant, quantity: parseInt(quantity, 10) }
        ]

        return client
          .addCheckoutLineItems(checkoutId, lineItemsToUpdate)
          .then(checkout => {
            this.setState(state => {
              return {
                store: {
                  ...state.store,
                  checkout,
                  adding: false
                }
              }
            })
          })
      },
      removeLineItem: (client, checkoutID, lineItemID) =>
        client.removeCheckoutLineItems(checkoutID, lineItemID).then(res => {
          this.setState(state => {
            return {
              store: {
                ...state.store,
                checkout: res
              }
            }
          })
        }),
      updateCheckoutLineItems: (client, checkoutID, lineItemID, quantity) =>
        client
          .updateCheckoutLineItems(
            checkoutID,
            lineItemID,
            parseInt(quantity, 10)
          )
          .then(res => {
            this.setState(state => {
              return {
                store: {
                  ...state.store,
                  checkout: res
                }
              }
            })
          })
    }
  }

  async initializeCheckout() {
    // Check for an existing cart.
    const isBrowser = typeof window !== `undefined`

    const setCheckoutInState = checkout => {
      if (isBrowser) {
        localStorage.setItem(`checkout`, JSON.stringify(checkout))
      }

      this.setState(state => {
        return {
          store: {
            ...state.store,
            checkout
          }
        }
      })
    }

    const fetchCheckout = () => this.state.store.client.fetchCheckout()
    try {
      const checkout = await fetchCheckout()
      setCheckoutInState(checkout)
    } catch (e) {
      localStorage.setItem(`checkout`, null)
    }
  }

  async loadCustomer(nickname) {
    try {
      // const { data } = await client.mutate({
      //   mutation: gql`
      //     mutation($user: String!) {
      //       updateCustomerTags(userId: $user) {
      //         email
      //         turtle {
      //           ordercount
      //           orders {
      //             id
      //           }
      //         }
      //         shopify {
      //           id
      //           codes {
      //             code
      //             used
      //           }
      //         }
      //       }
      //     }
      //   `,
      //   variables: { user: nickname }
      // });

      this.setState(state => {
        return {
          user: {
            ...state.user,
            // customer: data.updateCustomerTags,
            loading: false
          }
        }
      })
    } catch (error) {
      this.setState(state => {
        return {
          user: {
            ...state.user,
            error: error.toString(),
            loading: false
          }
        }
      })
    }
  }

  componentDidMount() {
    // Observe viewport switching from mobile to desktop and vice versa
    const mediaQueryToMatch = `(min-width: ${breakpoints.desktop}px)`

    this.desktopMediaQuery = window.matchMedia(mediaQueryToMatch)
    this.desktopMediaQuery.addListener(this.updateViewPortState)

    this.updateViewPortState()

    // Make sure we have a Shopify checkout created for cart management.
    this.initializeCheckout()

    // Mounting Layout on 'callback' page triggers user 'loading' flag
    if (this.props.location.pathname === `/callback/`) {
      this.setState(state => {
        return {
          user: { ...state.user, loading: true }
        }
      })
    }

    // Make sure to set user.profile when a visitor reloads the app
    if (this.props.location.pathname !== `/callback/`) {
      this.setUserProfile()
    }

    if (this.state.interface.customerAreaStatus === `initial`) {
      if (
        this.state.interface.isDesktopViewport === true ||
        this.state.interface.isDesktopViewport === null
      ) {
        this.state.interface.toggleCustomerArea()
      }
    }
  }

  componentDidUpdate(prevProps) {
    // Set user.profile after redirection from '/callback/' to '/'
    if (
      prevProps.location.pathname !== this.props.location.pathname &&
      prevProps.location.pathname === `/callback/`
    ) {
      this.setState(state => {
        return {
          interface: {
            ...state.interface,
            customerAreaStatus: `open`
          }
        }
      })
      this.setUserProfile()
    }

    // Close product modal window after navigating "back"
    if (
      prevProps.location.pathname !== this.props.location.pathname &&
      prevProps.location.pathname.startsWith(`/product/`)
    ) {
      this.setState(state => {
        return {
          interface: {
            ...state.interface,
            productImagesBrowserStatus: `closed`
          }
        }
      })
    }
  }

  componentWillUnmount = () => {
    this.desktopMediaQuery.removeListener(this.updateViewPortState)
  }

  updateViewPortState = e => {
    this.setState(state => {
      return {
        interface: {
          ...state.interface,
          isDesktopViewport: this.desktopMediaQuery.matches
        }
      }
    })
  }

  setUserProfile = () => {
    // Load the user info from Auth0.
    const profile = getUserInfo()

    // If logged in set user.profile
    if (profile && profile.nickname) {
      this.setState(state => {
        return {
          user: {
            ...state.user,
            profile,
            loading: true
          }
        }
      })

      // and load the customer data
      this.loadCustomer(profile.nickname)
    }
  }

  togglecustomerAreaStatus = () => {
    if (this.state.interface.customerAreaStatus === `initial`) {
      return `closed`
    } else {
      return this.state.interface.customerAreaStatus === `closed`
        ? `open`
        : `closed`
    }
  }

  render() {
    const { children, location } = this.props

    return (
      <>
        <Global styles={globalStyles} />
        <SiteMetadata />
        <UserContext.Provider value={this.state.user}>
          <StoreContext.Provider value={this.state.store}>
            <InterfaceContext.Provider value={this.state.interface}>
              <InterfaceContext.Consumer>
                {({
                  isDesktopViewport,
                  cartStatus,
                  toggleCart,
                  customerAreaStatus,
                  toggleCustomerArea,
                  productImagesBrowserStatus,
                  currentProductImages,
                  featureProductImage,
                  productImageFeatured,
                  toggleProductImagesBrowser
                }) => (
                  <>
                    <Header
                      location={location}
                      user={this.state.user}
                      toggle={toggleCustomerArea}
                      isDesktopViewport={isDesktopViewport}
                      productImagesBrowserStatus={productImagesBrowserStatus}
                    />
                    <Viewport>
                      <Cart
                        isDesktopViewport={isDesktopViewport}
                        status={cartStatus}
                        toggle={toggleCart}
                        customerAreaStatus={customerAreaStatus}
                        productImagesBrowserStatus={productImagesBrowserStatus}
                      />
                      <CustomerArea
                        location={location}
                        status={customerAreaStatus}
                        toggle={toggleCustomerArea}
                        isDesktopViewport={isDesktopViewport}
                        productImagesBrowserStatus={productImagesBrowserStatus}
                      />
                      <PageContent
                        cartStatus={cartStatus}
                        customerAreaStatus={customerAreaStatus}
                        isDesktopViewport={isDesktopViewport}
                        productImagesBrowserStatus={productImagesBrowserStatus}
                        location={location}
                      >
                        {children}
                      </PageContent>

                      {currentProductImages.length > 0 && (
                        <ProductImagesBrowser
                          featureProductImage={featureProductImage}
                          images={currentProductImages}
                          position={productImagesBrowserStatus}
                          imageFeatured={productImageFeatured}
                          toggle={toggleProductImagesBrowser}
                          isDesktopViewport={isDesktopViewport}
                        />
                      )}
                    </Viewport>
                  </>
                )}
              </InterfaceContext.Consumer>
            </InterfaceContext.Provider>
          </StoreContext.Provider>
        </UserContext.Provider>
      </>
    )
  }
}
