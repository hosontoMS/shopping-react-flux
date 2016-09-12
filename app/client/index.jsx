import jQuery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import AppContainer from './containers/appContainer';
import ProductsContainer from './containers/productsContainer';
import ProductContainer from './containers/productContainer';
import CartContainer from './containers/cartContainer';
import CheckoutContainer from './containers/checkoutContainer';
import OrderContainer from './containers/orderContainer';
import InitStore from './stores/initStore';

window.$ = window.jQuery = jQuery;
require('bootstrap');

InitStore.startup();

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
      <IndexRoute component={ProductsContainer} />
      <Route path="/product/:productId" component={ProductContainer} />
      <Route path="/cart" component={CartContainer} />
      <Route path="/checkout" component={CheckoutContainer} />
      <Route path="/orders" component={OrderContainer} />
    </Route>
  </Router>,
  document.getElementById('app')
);
