import React from 'react';
import { Link } from 'react-router';

export default class Products extends React.Component {
  render() {
    return (
      <div id="productsContainer">
        {this.props.products.map(product =>
          <div key={product._id} className="listItem">
            <Link to={`/product/${product._id}`}>
              <img className="listImg" src={`/images/${product.imagefile}`} />
            </Link>
            <span className="prodName" style={{ paddingLeft: 10 }}>{product.name}</span>
            <span className="price">{product.price}</span>
          </div>
        )}
      </div>
    );
  }
}

Products.propTypes = {
  products: React.PropTypes.array.isRequired,
};
