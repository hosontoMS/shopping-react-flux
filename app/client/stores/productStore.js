import {ReduceStore} from 'flux/utils';
import ActionTypes from '../actions/actionTypes';
import AppDispatcher from '../dispatcher/appDispatcher';

class ProductStore extends ReduceStore {
  getInitialState() {
    return [];
  }

  reduce(state, action) {
    const products = state.slice();
    switch(action.type) {
      case ActionTypes.addProduct:
        products.push(action.product);
        return products;
      case ActionTypes.updateInstock:
        const product = products.find(p => p._id === action.productId);
        product.instock += action.instock;
        return products;
      default:
        return state;
    }
  }

  getInstockQuantity(productId) {
    const product = this.getState().find(p => p._id === productId);
    return product.instock;
  }
}

const productStore = new ProductStore(AppDispatcher);
export default productStore;
