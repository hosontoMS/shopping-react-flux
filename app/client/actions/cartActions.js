import ActionTypes from './actionTypes';
import AppDispatcher from '../dispatcher/appDispatcher';
import Request from 'superagent';

export default class CartActions {

  static setCart(cart) {
    AppDispatcher.dispatch({
      type: ActionTypes.setCart,
      cart
    });
  }

  static addToCart(product) {
    AppDispatcher.dispatch({
      type: ActionTypes.addToCart,
      product,
    });
  }

  static removeFromCart(productId) {
    AppDispatcher.dispatch({
      type: ActionTypes.removeFromCart,
      productId,
    });
  }

  static updateQuantity(productId, quantity) {
    AppDispatcher.dispatch({
      type: ActionTypes.updateQuantity,
      productId,
      quantity,
    });
  }
}
