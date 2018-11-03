import { combineReducers } from 'redux';

import editor from './Editor';
import order from './Order';
import repeaters from './Repeaters';
import shapes from './Shapes';

export default combineReducers({
  shapes,
  order,
  editor,
  repeaters
});
