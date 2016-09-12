import React from 'react';
import CartActions from '../actions/cartActions';
import ProductActions from '../actions/productActions';

export default class Product extends React.Component {
  constructor(props) {
    super(props);
    this.handleCartClick = this.handleCartClick.bind(this);
  }

  handleCartClick(e) {
    e.preventDefault();
    if (this.props.product.instock > 0) {
      CartActions.addToCart(this.props.product);
      ProductActions.updateInstock(this.props.product._id, -1);
    }
  }

  render() {
    const { product } = this.props;
    return (
      <div id="productContainer">
        <img
          className="fullImg"
          src={`/images/${product.imagefile}`}
        />
        <div className="prodInfo">
	         <p className="itemTitle">{product.name}</p>
           <p className="prodDesc">{product.description}</p>
           <p className="fullPrice">{product.price}</p>
           <p className="status">{product.instock} available</p>
           <p className="cartButton" onClick={this.handleCartClick}>
	           Add to Cart
	            <img src="/images/cart.png" />
          </p>
        </div>
      </div>
    );
  }
}
