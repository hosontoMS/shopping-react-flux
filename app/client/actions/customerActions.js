import ActionTypes from './actionTypes';
import AppDispatcher from '../dispatcher/appDispatcher';
import Request from 'superagent';
import CartActions from './cartActions';

export default class CustomerActions {
  static set(customer) {
    AppDispatcher.dispatch({
      type: ActionTypes.setCustomer,
      customer,
    });
  }

  static get(customer) {
    Request.get('/customers/get')
      .set('Accept', 'application/json')
      .end(function(err, response) {
        if (err) return console.error(err);
        AppDispatcher.dispatch({
          type: ActionTypes.setCustomer,
          customer: response.body
        });
        CartActions.setCart(response.body.cart);
    });
  }
}
