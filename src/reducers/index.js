import { combineReducers } from 'redux';

import shapes from './Shapes';
import order from './Order';
import editor from './Editor';
import shapeValues from './ShapeValues';

export default combineReducers({ shapes, order, editor, shapeValues });
