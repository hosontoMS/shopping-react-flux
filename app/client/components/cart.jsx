import React from 'react';
import { browserHistory } from 'react-router';
import CartActions from '../actions/cartActions';
import ProductActions from '../actions/productActions';
import OrderActions from '../actions/orderActions';

export default class Cart extends React.Component {

  constructor(props) {
    super(props);
    this.handleShoppingClick = this.handleShoppingClick.bind(this);
    this.handleCheckoutClick = this.handleCheckoutClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.handleProductClick = this.handleProductClick.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.components = {};
  }

  cartTotal() {
    let total = 0;
    this.props.items.forEach(item => {
      total += item.price * item.quantity;
    });
    return total;
  }

  handleShoppingClick(e) {
    e.preventDefault();
    browserHistory.push('/');
  }

  handleRemoveClick(productId, quantity) {
    CartActions.removeFromCart(productId);
    ProductActions.updateInstock(productId, quantity);
    this.components[productId] = undefined;
    console.log(Object.keys(this.components));
  }

  handleQuantityChange(productId, newQuantity, oldQuantity) {
    if (isNaN(newQuantity)) {
      return;
    }
    if (newQuantity === 0) {
      this.handleRemoveClick(productId, oldQuantity);
    } else {
      const availableQuantity = this.props.getInstockQuantity(productId);
      if (newQuantity > (oldQuantity + availableQuantity)) {
        alert('The product is not available');
      }
    }
  }

  handleProductClick(productId) {
    browserHistory.push(`/product/${productId}`);
  }

  handleCheckoutClick(e) {
    e.preventDefault();
    let isValid = true;
    let index = 0;
    for(let key in this.components) {
      if(!this.components[key]) {
        continue;
      }
      const quantity = this.components[key].value;
      if (isNaN(parseInt(quantity))) {
        isValid = false;
        break;
      }
      const availableQuantity = this.props.getInstockQuantity(key);
      const oldQuantity = this.props.items[index].quantity;
      if(quantity > (oldQuantity + availableQuantity)) {
        isValid = false;
        break;
      }
      index++;
    }
    if (isValid) {
      let index = 0;
      for(let key in this.components) {
        if(!this.components[key]) {
          continue;
        }
        const quantity = parseInt(this.components[key].value);
        const oldQuantity = this.props.items[index].quantity;
        CartActions.updateQuantity(key, quantity);
        ProductActions.updateInstock(key, oldQuantity - quantity);
        index++;
      }
      this.props.onCheckout();
      OrderActions.addNew();
      browserHistory.push('/checkout');
    } else {
      alert('Some quantities are invalid');
    }
  }

  render() {
    const shipping = 0;
    return (
      <div id="cartsContainer">
      {this.props.items.map((item, index) =>
        <div key={item._id} className="listItem">
          <img
            className="listImg"
            onClick={e => this.handleProductClick(item._id)}
            src={`/images/${item.imagefile}`}
          />
          <span className="prodName">{item.name}</span>
          <span>
            <span className="price">{item.price}</span>
            <input
              className="quantity"
              type="text"
              ref={c => { this.components[item._id] = c; }}
              defaultValue={item.quantity}
              onChange={e => this.handleQuantityChange(item._id, parseInt(e.target.value), item.quantity)}
            />
            <label className="quantity">Quantity</label>
            <span
              className="delete"
              onClick={e => this.handleRemoveClick(item._id, item.quantity)}
            >
              Remove
            </span>
          </span>
        </div>
      )}
      <hr />
      <div>
        <span>Shipping</span>
        <span className="price">{shipping}</span>
      </div>
      <hr />
      <div>
        <span>Total</span>
        <span className="price">{this.cartTotal()}</span>
      </div>
      <hr />
      <div>
        {this.props.items.length > 0 ?
	      <span className="button" onClick={this.handleCheckoutClick}>
	        Checkout
	      </span> :
        null }
	      <span className="button" onClick={this.handleShoppingClick}>
	        Continue Shopping
	      </span>
      </div>
    </div>
    );
  }
}
