import React from 'react';
import { browserHistory } from 'react-router';
import OrderActions from '../actions/orderActions';

export default class Order extends React.Component {
  componentDidMount() {
    OrderActions.getOrders();
  }

  render() {
    return (
      <div id="reviewContainer">
      {this.props.orders.map(order =>
        <div className="listItem" key={order._id}>
          <p className="itemTitle">Order #{order._id}</p>
          <p className="prodDesc">Placed {order.timestamp.toString()}</p>
          <p className="status">{order.status}</p>
          {order.items.map(item =>
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
        </div>
      )}
        <div>
          <span className="button" onClick={e => browserHistory.push('/')}>
            Continue Shopping
          </span>
        </div>
      </div>
    );
  }
}
