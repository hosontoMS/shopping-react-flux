import ActionTypes from './actionTypes';
import AppDispatcher from '../dispatcher/appDispatcher';
import Request from 'superagent'

export default class ProductActions {
  static add(product) {
    AppDispatcher.dispatch({
      type: ActionTypes.addProduct,
      product,
    });
  }

  static updateInstock(productId, instock) {
    AppDispatcher.dispatch({
      type: ActionTypes.updateInstock,
      productId,
      instock,
    });
  }

  static get() {
    Request.get('/products/get')
      .set('Accept', 'application/json')
      .end(function(err, response) {
        if (err) return console.error(err);
        response.body.forEach(product => {
          AppDispatcher.dispatch({
            type: ActionTypes.addProduct,
            product,
          });
        });
    });
  }
}
