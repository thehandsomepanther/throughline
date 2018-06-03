// @flow

import { pickBy } from 'lodash';
import makeDefaultShape from '../util/makeDefaultShape';
import { SHAPE_RECT } from '../types/shapes';
import type { ShapesStateType, ShapeType } from '../types/shapes';
import type { ActionType } from '../actions';

export const shapesInitialState: ShapesStateType = {
  rect: makeDefaultShape(SHAPE_RECT, 'rect'),
};

export default (
  state: ShapesStateType = shapesInitialState,
  action: ActionType,
): ShapesStateType => {
  switch (action.type) {
    case 'SHAPE_UPDATE_USING':
      return {
        ...state,
        [action.shape]: {
          ...state[action.shape],
          [action.prop]: {
            ...state[action.shape][action.prop],
            using: action.using,
          },
        },
      };
    case 'SHAPE_UPDATE_CONST':
      return {
        ...state,
        [action.shape]: {
          ...state[action.shape],
          [action.prop]: {
            ...state[action.shape][action.prop],
            const: action.value || 0,
          },
        },
      };
    case 'SHAPE_UPDATE_FN':
      return {
        ...state,
        [action.shape]: {
          ...state[action.shape],
          [action.prop]: {
            ...state[action.shape][action.prop],
            fn: action.value || '',
          },
        },
      };
    case 'SHAPE_NEW_SHAPE':
      return {
        ...state,
        [action.id]: action.shape,
      };
    case 'SHAPE_DELETE_SHAPE':
      const { id } = action;
      return pickBy(
        state,
        (value: ShapeType, key: string): boolean => key !== id,
      );
    default:
      return { ...state };
  }
};
