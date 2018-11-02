import { combineReducers } from 'redux';

import shapes from './Shapes';
import order from './Order';
import editor from './Editor';
import repeaters from './Repeaters';

export default combineReducers({
  shapes,
  order,
  editor,
  repeaters
});
