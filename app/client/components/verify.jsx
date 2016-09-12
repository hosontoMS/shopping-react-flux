import React from 'react';
import { browserHistory } from 'react-router';

export default class Verify extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, {
      items: props.items,
      shipping: props.shipping,
      billing: props.billing,
    });
  }

  cartTotal() {
    let total = 0;
    this.state.items.forEach(item => {
      total += item.price * item.quantity;
    });
    return total;
  }

  render() {
    const shipping = 0;
    return (
      <div id="reviewContainer">
      {this.state.items.map(item =>
        <div className="listItem" key={item._id}>
          <img
            className="listImg"
            onClick={e => browserHistory.push(`/product/${item._id}`)}
            src={`/images/${item.imagefile}`}
          />
          <span className="prodName">{item.name}</span>
          <span >
            <span className="price">{item.price}</span>
            <label className="quantity">{item.quantity}</label>
            <label className="quantity">Quantity</label>
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
          <div className="review">
            Shipping:<br />
            {this.state.shipping.name}<br />
            {this.state.shipping.address}<br />
            {this.state.shipping.city},&nbsp;
            {this.state.shipping.state},&nbsp;
            {this.state.shipping.zip}<br />
          </div>
          <div className="review">
            Billing:<br />
            {this.state.billing.cardType} ending in&nbsp;
            {this.state.billing.number.slice(-5,-1)}<br />
            {this.state.billing.address.name}<br />
            {this.state.billing.address.address}<br />
            {this.state.billing.address.city},&nbsp;
            {this.state.billing.address.state},&nbsp;
            {this.state.billing.address.zip}<br />
          </div>
        </div>
        <div>
          <span className="button" onClick={e => this.props.onCompleted()}>
            Make Purchase
          </span>
          <span className="button" onClick={e => browserHistory.push('/')}>
            Continue Shopping
          </span>
        </div>
      </div>
    );
  }
}
