import React from 'react';
import {Container} from 'flux/utils';
import ProductStore from '../stores/productStore';
import CartStore from '../stores/cartStore';
import Cart from '../components/cart';
import Request from 'superagent';

class CartContainer extends React.Component {
  static getStores() {
    return [CartStore, ProductStore];
  }

  static calculateState(prevState) {
    return {
      items: CartStore.getState(),
    };
  }

  constructor(props) {
    super(props);
    this.handleCheckout = this.handleCheckout.bind(this);
  }

  handleCheckout() {
    Request.post('/customers/update/cart')
      .send({ updatedCart: CartStore.getState() })
      .set('Accept', 'application/json')
      .end(function(err, response) {
        if (err) return console.error(err);
    });
  }

  render() {
    return (
      <Cart items={this.state.items}
            getInstockQuantity={productId => ProductStore.getInstockQuantity(productId)}
            onCheckout={this.handleCheckout}
      />
    );
  }
}

const cartContainer = Container.create(CartContainer);
export default cartContainer;
