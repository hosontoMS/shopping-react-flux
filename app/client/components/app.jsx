import React from 'react';
import Products from './products';
import ProductActions from '../actions/productActions';
import { browserHistory } from 'react-router';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.handleCartClick = this.handleCartClick.bind(this);
    this.handleOrdersClick = this.handleOrdersClick.bind(this);
  }

  handleCartClick(e) {
    e.preventDefault();
    browserHistory.push('/cart');
  }

  handleOrdersClick(e) {
    e.preventDefault();
    browserHistory.push('/orders');
  }

  render() {
    return (
        <div id="banner">
          <div id="title">My Store</div>
          <div id="bar">
            <span className="orders" onClick={this.handleOrdersClick}>Orders</span>
            <span id="cartLink" onClick={this.handleCartClick}>
                {this.props.itemCount} items
                <img src="/images/cart.png" />
            </span>
          </div>
        </div>
    );
  }
}
