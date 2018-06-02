// @flow

import { makeDefaultRect, makeDefaultEllipse } from '../defaultShapes';
import type { ShapesStateType } from '../types/shapes';
import type { ActionType } from '../actions';

export const shapesInitialState: ShapesStateType = {
  rect: makeDefaultRect('rect'),
  ellipse: makeDefaultEllipse('ellipse'),
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
    default:
      return { ...state };
  }
};
