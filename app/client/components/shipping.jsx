import React from 'react';
import { browserHistory } from 'react-router';

export default class Shipping extends React.Component {
  constructor(props) {
    super(props);
    this.handleShoppingClick = this.handleShoppingClick.bind(this);
    this.handleContinueClick = this.handleContinueClick.bind(this);
    this.state = Object.assign({}, props.address);
  }

  handleShoppingClick(e) {
    e.preventDefault();
    browserHistory.push('/');
  }

  handleContinueClick(e) {
    e.preventDefault();
    this.props.onCompleted(this.state);
  }

  render() {
    return (
      <div id="shippingContainer">
        <h2>Ship To:</h2>
        <label>Name</label>
        <input
          type="text"
          value={this.state.name}
          onChange={e => this.setState({ name: e.target.value })}
        />
        <br />
        <label>Address</label>
        <input
          type="text"
          value={this.state.address}
          onChange={e => this.setState({ address: e.target.value })}
        />
        <br />
        <label>City</label>
        <input
          type="text"
          value={this.state.city}
          onChange={e => this.setState({ city: e.target.value})}
        />
        <br />
        <label>State</label>
        <input
          type="text"
          value={this.state.state}
          onChange={e => this.setState({ state: e.target.value })}
        />
        <br />
        <label>Zipcode</label>
        <input
          type="text"
          value={this.state.zip}
          onChange={e => this.setState({ zip: e.target.value })}
        />
        <hr />
        <div>
          <span className="button" onClick={this.handleContinueClick}>
            Continue to Billing
          </span>
          <span className="button" onClick={this.handleShoppingClick}>
            Continue Shopping
          </span>
        </div>
      </div>
    );
  }
}
