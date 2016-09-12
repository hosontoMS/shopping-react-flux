import {ReduceStore} from 'flux/utils';
import ActionTypes from '../actions/actionTypes';
import AppDispatcher from '../dispatcher/appDispatcher';

class CartStore extends ReduceStore {
  getInitialState() {
    return [];
  }

  reduce(state, action) {
    const items = state.slice();
    let item;
    switch(action.type) {
      case ActionTypes.setCart:
        return action.cart;
      case ActionTypes.addToCart:
        const product = action.product;
        item = items.find(item => item._id === product._id);
        if (item) {
          item.quantity += 1;
        } else {
          item = Object.assign(product, { quantity: 1 });
          items.push(item);
        }
        return items;
      case ActionTypes.removeFromCart:
        const itemIndex = items.findIndex(item => item._id === action.productId);
        if (itemIndex > -1) {
          items.splice(itemIndex, 1);
        }
        return items;
      case ActionTypes.updateQuantity:
        item = items.find(item => item._id === action.productId);
        if (item) {
          item.quantity = action.quantity;
        }
        return items;
      case ActionTypes.placeOrder:
        return [];
      default:
        return state;
    }
  }
}

const cartStore = new CartStore(AppDispatcher);
export default cartStore;
