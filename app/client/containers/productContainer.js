import React from 'react';
import {Container} from 'flux/utils';
import ProductStore from '../stores/productStore';
import Product from '../components/product';

class ProductContainer extends React.Component {
  static getStores() {
    return [ProductStore];
  }

  static calculateState(prevState) {
    return {
      products: ProductStore.getState(),
    };
  }

  render() {
    const product = this.state.products.find(product =>
      this.props.params.productId === product._id);
    return (
      <Product product={product} />
    );
  }
}

const productContainer = Container.create(ProductContainer);
export default productContainer;
