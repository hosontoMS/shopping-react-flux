import React from 'react';
import {Container} from 'flux/utils';
import ProductStore from '../stores/productStore';
import Products from '../components/products';

class ProductsContainer extends React.Component {
  static getStores() {
    return [ProductStore];
  }

  static calculateState(prevState) {
    return {
      products: ProductStore.getState(),
    };
  }

  render() {
    return (
      <Products products={this.state.products} />
    );
  }
}

const productsContainer = Container.create(ProductsContainer);
export default productsContainer;
