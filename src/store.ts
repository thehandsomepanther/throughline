import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

export default (initialState: {} = {}): any =>
  createStore(rootReducer, initialState, applyMiddleware(thunk));
