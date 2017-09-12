import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux'

import store from './store/index.js';

import Screen from './BaseballScene/index.js';
import Menu from './Menus/index.js';

const App = () => {
  return (
    <MuiThemeProvider>
      <Provider store={store}>
        <div style={{ height: '100%', width: '100%' }}>
          <Menu />
          <Screen />
        </div>
      </Provider>
    </MuiThemeProvider>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'));