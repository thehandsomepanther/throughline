import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store';
import Home from './components/Home';
import registerServiceWorker from './registerServiceWorker';

import './css/fonts/stylesheet.css';

const root = document.getElementById('root');

if (root) {
  ReactDOM.render(
    <Provider store={configureStore()}>
      <Home />
    </Provider>,
    root,
  );
}

registerServiceWorker();
