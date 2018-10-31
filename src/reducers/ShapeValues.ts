import { pickBy } from 'lodash';
import { ShapesAction } from '../types/shapes';
import { ShapeValuesState, ShapeValuesAction } from '../types/shapeValues';
import { Action } from '../actions';

const initialState: ShapeValuesState = {};

export default (
  state: ShapeValuesState = initialState,
  action: Action,
): ShapeValuesState => {
  switch (action.type) {
    case ShapeValuesAction.ResetValues:
      return {
        ...action.shapeValues,
      };
    case ShapeValuesAction.SetValues:
      return {
        ...state,
        [action.shape]: action.shapeValues,
      };
    case ShapeValuesAction.UpdateValues:
      return {
        ...state,
        [action.shape]: {
          ...state[action.shape],
          properties: {
            ...state[action.shape].properties,
            [action.prop]: action.values,
          },
        },
      };
    case ShapesAction.DeleteShape:
      const { id } = action;
      return pickBy(state, (_, key: string): boolean => key !== id);
    default:
      return { ...state };
  }
};
