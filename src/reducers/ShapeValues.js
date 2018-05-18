// @flow

import type { ShapeValuesStateType } from '../types/shapeValues';
import type { ActionType } from '../actions';

const initialState: ShapeValuesStateType = {};

export default (
  state: ShapeValuesStateType = initialState,
  action: ActionType,
): ShapeValuesStateType => {
  switch (action.type) {
    case 'SHAPE_VALUES_SET_VALUES':
      return {
        ...action.shapeValues,
      };
    case 'SHAPE_VALUES_UPDATE_VALUES':
      return {
        ...state,
        [action.shape]: {
          ...state[action.shape],
          [action.prop]: action.values,
        },
      };
    default:
      return { ...state };
  }
};
