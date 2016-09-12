import React from 'react';
import {Container} from 'flux/utils';
import CartStore from '../stores/cartStore';
import App from '../components/app';

class AppContainer extends React.Component {
  static getStores() {
    return [CartStore];
  }

  static calculateState(prevState) {
    return {
      items: CartStore.getState(),
    };
  }

  render() {
    return (
      <div>
        <App itemCount={this.state.items.length} />
        <div id="main">
          {this.props.children}
        </div>
      </div>
    );
  }
}

const appContainer = Container.create(AppContainer);
export default appContainer;
