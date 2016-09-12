import React from 'react';
import {Container} from 'flux/utils';
import OrderStore from '../stores/orderStore';
import Order from '../components/order';

class OrderContainer extends React.Component {
  static getStores() {
    return [OrderStore];
  }

  static calculateState(prevState) {
    return {
      orders: OrderStore.getPlacedOrders() || [],
    };
  }

  render() {
    return (
      <Order orders={this.state.orders} />
    );
  }
}

const orderContainer = Container.create(OrderContainer);
export default orderContainer;
