import {ReduceStore} from 'flux/utils';
import ActionTypes from '../actions/actionTypes';
import AppDispatcher from '../dispatcher/appDispatcher';
import CartStore from './cartStore';

class OrderStore extends ReduceStore {
  getInitialState() {
    return [];
  }

  reduce(state, action) {
    const orders = state.slice();
    const order = orders.find(o => o.status === 'Pending');
    switch(action.type) {
      case ActionTypes.addNewOrder:
        this.stage = 'shipping';
        const cart = CartStore.getState();
        Object.assign(action.order, { items: cart.slice() }, { _id: (orders.length + 1).toString() });
        orders.push(action.order);
        return orders;
      case ActionTypes.setShippingAddress:
        this.stage = 'billing';
        Object.assign(order, { shipping: action.address });
        return orders;
      case ActionTypes.setBillingInfo:
        this.stage = 'verify';
        Object.assign(order, { billing: action.billingInfo });
        return orders;
      case ActionTypes.placeOrder:
        this.stage = 'placed';
        Object.assign(order, {
          _id: action.id,
          status: action.status,
          timestamp: action.timestamp
        });
        return orders;
      case ActionTypes.getOrders:
        console.log(JSON.stringify(action.orders));
        return action.orders.slice();
      default:
        return state;
    }
  }

  getPendingOrder() {
    return this.getState().find(order => order.status === 'Pending');
  }

  getPlacedOrders() {
    return this.getState().filter(order => order.status === 'Placed');
  }

  getStage() {
    return this.stage || 'shipping';
  }
}

const orderStore = new OrderStore(AppDispatcher);
export default orderStore;
