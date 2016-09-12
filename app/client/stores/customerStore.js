import {ReduceStore} from 'flux/utils';
import ActionTypes from '../actions/actionTypes';
import AppDispatcher from '../dispatcher/appDispatcher';

class CustomerStore extends ReduceStore {
  getInitialState() {
    return {};
  }

  reduce(state, action) {
    switch(action.type) {
      case ActionTypes.setCustomer:
        return action.customer;
      case ActionTypes.setShippingAddress:
        return Object.assign({}, state, { shipping: action.address });
      case ActionTypes.setBillingInfo:
        return Object.assign({}, state, { billing: action.billingInfo });
      default:
        return state;
    }
  }
}

const customerStore = new CustomerStore(AppDispatcher);
export default customerStore;
