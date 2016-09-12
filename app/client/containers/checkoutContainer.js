import React from 'react';
import {Container} from 'flux/utils';
import { browserHistory } from 'react-router';
import CustomerStore from '../stores/customerStore';
import OrderStore from '../stores/orderStore';
import Shipping from '../components/shipping';
import Billing from '../components/billing';
import Verify from '../components/verify';
import OrderActions from '../actions/orderActions';

class CheckoutContainer extends React.Component {
  static getStores() {
    return [CustomerStore, OrderStore];
  }

  static calculateState(prevState) {
    let stage = 'shipping';
    if (prevState !== null) {
      stage = prevState.stage;
    }
    return {
      customer: CustomerStore.getState(),
      order: OrderStore.getPendingOrder(),
      stage: OrderStore.getStage(),
    };
  }

  constructor(props) {
    super(props);
    this.handleShippingCompleted = this.handleShippingCompleted.bind(this);
    this.handleBillingCompleted = this.handleBillingCompleted.bind(this);
    this.handleVerifyCompleted = this.handleVerifyCompleted.bind(this);
  }

  handleShippingCompleted(shippingAddress) {
    OrderActions.setShippingAddress(shippingAddress);
  }

  handleBillingCompleted(billingInfo) {
    OrderActions.setBillingInfo(billingInfo);
  }

  handleVerifyCompleted() {
    OrderActions.placeOrder(this.state.order);
  }

  render() {
    let component;
    switch(this.state.stage) {
      case 'shipping':
        component = <Shipping
                      address={this.state.customer.shipping}
                      onCompleted={this.handleShippingCompleted}
                    />;
        break;
      case 'billing':
        component = <Billing
                      billingInfo={this.state.customer.billing}
                      onCompleted={this.handleBillingCompleted}
                    />;
        break;
      case 'verify':
        component = <Verify
                      items={this.state.order.items}
                      shipping={this.state.order.shipping}
                      billing={this.state.order.billing}
                      onCompleted={this.handleVerifyCompleted}
                    />;
        break;
      case 'placed':
        browserHistory.push('/orders');
        component = null;
        break;
      default:
        component = null;
        break;
    }

    return component;
  }
}

const checkoutContainer = Container.create(CheckoutContainer);
export default checkoutContainer;
