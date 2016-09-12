import React from 'react';
import { browserHistory } from 'react-router';

export default class Billing extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, props.billingInfo);
    this.months = Array.from({length: 12}, (v, k) => k + 1);
    this.years = Array.from({length: 10}, (v, k) => k + (new Date()).getFullYear());
    this.handleShoppingClick = this.handleShoppingClick.bind(this);
    this.handleVerifyClick = this.handleVerifyClick.bind(this);
  }

  handleVerifyClick(e) {
    e.preventDefault();
    this.props.onCompleted(this.state);
  }

  handleShoppingClick(e) {
    e.preventDefault();
    browserHistory.push('/');
  }

  render() {
    return (
      <div id="shippingContainer">
        <h2>Card Info: </h2>
        <label>Card</label>
        <input
          type="radio"
          name="cardType"
          checked={this.state.cardType === 'Visa'}
          value="Visa"
          onChange={e => this.setState({ cardType: 'Visa' })}
        />  Visa
        <input
          type="radio"
          name="cardType"
          checked={this.state.cardType === 'Amex'}
          value="Amex"
          onChange={e => this.setState({ cardType: 'Amex' })}
        /> Amex
        <input
          type="radio"
          name="cardType"
          checked={this.state.cardType === 'MasterCard'}
          value="MasterCard"
          onChange={e => this.setState({ cardType: 'MasterCard' })}
        /> MasterCard
        <br />
        <label>Name on Card</label>
        <input
          type="text"
          value={this.state.name}
          onChange={e => this.setState({ name: e.target.value })} />
        <br />
        <label>Card Number</label>
        <input
          type="text"
          value={this.state.number}
          onChange={e => this.setState({ number: e.target.value })} />
        <br />
        <label>Expires</label>
        <select
          value={this.state.expiryMonth}
          onChange={e => this.setState({ expiryMonth: e.target.value })}
        >
          {this.months.map(m =>
            <option key={m} value={m}>{m}</option>
          )}
        </select>
        <select
          value={this.state.expiryYear}
          onChange={e => this.setState({ expiryYear: e.target.value })}
        >
          {this.years.map(y =>
            <option key={y} value={y}>{y}</option>
          )}
        </select>
        <label>Card CCV</label>
        <input className="security" type="text" />
        <h2>Billing Address:</h2>
        <label>Name</label>
        <input
          type="text"
          value={this.state.address.name}
          onChange={e => this.setState({ address: { name: e.target.value }})}
        />
        <br />
        <label>Address</label>
        <input
          type="text"
          value={this.state.address.address}
          onChange={e => this.setState({ address: { address: e.target.value }})}
        />
        <br />
        <label>City</label>
        <input
          type="text"
          value={this.state.address.city}
          onChange={e => this.setState({ address: { city: e.target.value }})}
        />
        <br />
        <label>State</label>
        <input
          type="text"
          value={this.state.address.state}
          onChange={e => this.setState({ address: { state: e.target.value }})}
        />
        <br />
        <label>Zipcode</label>
        <input
          type="text"
          value={this.state.address.zip}
          onChange={e => this.setState({ address: { zip: e.target.value }})}
        />
        <hr />
        <div>
          <span className="button" onClick={this.handleVerifyClick}>
          Verify Billing
          </span>
          <span className="button" onClick={this.handleShoppingClick}>
          Continue Shopping
          </span>
        </div>
      </div>
    );
  }
}
