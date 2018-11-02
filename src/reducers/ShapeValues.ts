import { pickBy } from 'lodash';
import { ShapesAction } from '../types/shapes';
import { ShapeValuesState, ShapeValuesAction } from '../types/shapeValues';
import { Action } from '../actions';

const initialState: ShapeValuesState = {};

export default (
  state: ShapeValuesState = initialState,
  action: Action
): ShapeValuesState => {
  const newState = { ...state };

  switch (action.type) {
    case ShapeValuesAction.ResetValues:
      return {
        ...action.shapeValues
      };
    case ShapeValuesAction.SetValues:
      return {
        ...state,
        [action.shapeID]: action.shapeValues
      };
    case ShapeValuesAction.UpdateValues:
      newState[action.shapeID][action.prop] = action.values;
      return newState;
    case ShapesAction.DeleteShape:
      return pickBy(state, (_, key: string): boolean => key !== action.shapeID);
    default:
      return { ...state };
  }
};
