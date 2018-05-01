import { combineReducers } from 'redux';

import shapes from './Shapes';
import properties from './Properties';
import order from './Order';

export default combineReducers({ shapes, properties, order });
