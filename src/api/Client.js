import uuid from 'uuid';

const isBrowser = typeof window !== 'undefined';

export default class Client {
  Client({ domain, accessToken }) {
    this.domain = domain;
    this.accessToken = accessToken;
    this.checkout = {};
  }
  createCheckout() {
    if (!this.checkout) this.checkout = {};
    this.checkout = {
      id: uuid.v4(),
      lineItems: [],
      totalPrice: 0,
      totalTax: 0,
      subtotalPrice: 0,
      quantity: 0
    };
    return this.checkout;
  }

  fetchCheckout() {
    const existingCheckout = localStorage.getItem('checkout');
    if (existingCheckout) {
      this.checkout = { ...JSON.parse(existingCheckout) };
    } else {
      this.createCheckout();
    }
    return Promise.resolve(this.checkout);
  }
  updatePrices() {
    let subtotalPrice = 0;
    const checkout = this.checkout;
    checkout.lineItems.forEach(item => {
      subtotalPrice += item.variant.Selling_Price_Unit * item.quantity;
    });
    checkout.subtotalPrice = subtotalPrice;
    checkout.totalTax = 0.18 * subtotalPrice;
    checkout.totalPrice = subtotalPrice + checkout.totalTax;
  }
  addCheckoutLineItems(checkoutId, lineItemsToUpdate) {
    const checkout = this.checkout;
    checkout.lineItems = [...checkout.lineItems, ...lineItemsToUpdate];
    this.updatePrices();
    if (isBrowser) {
      localStorage.setItem('checkout', JSON.stringify(checkout));
    }
    return Promise.resolve(checkout);
  }
  removeCheckoutLineItems(checkoutID, lineItemID) {
    const checkout = this.checkout;
    const lineItemIndex = checkout.lineItems.findIndex(
      lineItem => lineItem.id === lineItemID
    );
    checkout.lineItems.splice(lineItemIndex, 1);
    this.updatePrices();
    if (isBrowser) {
      localStorage.setItem('checkout', JSON.stringify(checkout));
    }
    return Promise.resolve(checkout);
  }
  updateCheckoutLineItems(checkoutID, lineItemID, quantity) {
    const checkout = this.checkout;
    const lineItemIndex = checkout.lineItems.findIndex(
      lineItem => lineItem.id === lineItemID
    );
    checkout.lineItems[lineItemIndex] = {
      ...checkout.lineItems[lineItemIndex],
      quantity
    };
    this.updatePrices();
    localStorage.setItem('checkout', JSON.stringify(checkout));
    return Promise.resolve(checkout);
  }
}
