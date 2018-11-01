import { createStore, applyMiddleware } from 'redux';
import { shapesMiddleware } from './middleware/Shapes';
import rootReducer from './reducers';

export default (initialState: {} = {}): any =>
  createStore(rootReducer, initialState, applyMiddleware(shapesMiddleware));
