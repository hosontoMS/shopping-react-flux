import ActionTypes from './actionTypes';
import AppDispatcher from '../dispatcher/appDispatcher';
import Request from 'superagent';

export default class OrderActions {
  static addNew() {
    AppDispatcher.dispatch({
      type: ActionTypes.addNewOrder,
      order: {
        _id: '0',
        status: 'Pending',
      },
    });
  }

  static setShippingAddress(address) {
    Request.post('/customers/update/shipping')
      .send({ updatedShipping: address })
      .set('Accept', 'application/json')
      .end(function(err, response) {
        if (err) return console.error(err);
        AppDispatcher.dispatch({
          type: ActionTypes.setShippingAddress,
          address,
        });
    });
  }

  static setBillingInfo(billingInfo) {
    Request.post('/customers/update/billing')
      .send({ updatedBilling: billingInfo })
      .set('Accept', 'application/json')
      .end(function(err, response) {
        if (err) return console.error(err);
        AppDispatcher.dispatch({
          type: ActionTypes.setBillingInfo,
          billingInfo,
        });
    });
  }

  static placeOrder(order) {
    Request.post('/orders/add')
      .send(order)
      .set('Accept', 'application/json')
      .end(function(err, response) {
        if (err) return console.error(err);
        AppDispatcher.dispatch({
          type: ActionTypes.placeOrder,
          id: response.id,
          timestamp: response.timestamp,
          status: response.status,
        });
    });
  }

  static getOrders() {
    Request.get('/orders/get')
      .set('Accept', 'application/json')
      .end(function(err, response) {
        if (err) return console.error(err);
        AppDispatcher.dispatch({
          type: ActionTypes.getOrders,
          orders: response.body,
        });
    });
  }
}
