// @flow

import makeDefaultShape from '../util/makeDefaultShape';
import { SHAPE_RECT, SHAPE_ELLIPSE } from '../types/shapes';
import type { ShapesStateType } from '../types/shapes';
import type { ActionType } from '../actions';

export const shapesInitialState: ShapesStateType = {
  rect: makeDefaultShape(SHAPE_RECT, 'rect'),
  ellipse: makeDefaultShape(SHAPE_ELLIPSE, 'ellipse'),
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
    default:
      return { ...state };
  }
};
