// @flow

import { pickBy } from 'lodash';
import type {
  ShapeValuesStateType,
  ShapeValuesType,
} from '../types/shapeValues';
import type { ActionType } from '../actions';

const initialState: ShapeValuesStateType = {};

export default (
  state: ShapeValuesStateType = initialState,
  action: ActionType,
): ShapeValuesStateType => {
  switch (action.type) {
    case 'SHAPE_VALUES_RESET_VALUES':
      return {
        ...action.shapeValues,
      };
    case 'SHAPE_VALUES_SET_VALUES':
      return {
        ...state,
        [action.shape]: action.shapeValues,
      };
    case 'SHAPE_VALUES_UPDATE_VALUES':
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
    case 'SHAPE_DELETE_SHAPE':
      const { id } = action;
      return pickBy(
        state,
        (value: ShapeValuesType, key: string): boolean => key !== id,
      );
    default:
      return { ...state };
  }
};
