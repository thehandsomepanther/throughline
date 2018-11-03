import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import Home from './containers/Home';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store';

import './styles/css/fonts/stylesheet.css';
import './styles/css/reset.css';

const root = document.getElementById('root');

if (root) {
  ReactDOM.render(
    <Provider store={configureStore()}>
      <Home />
    </Provider>,
    root
  );
}

registerServiceWorker();
