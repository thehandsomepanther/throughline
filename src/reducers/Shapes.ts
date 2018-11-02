import { pickBy } from 'lodash';
import makeDefaultShape from '../util/makeDefaultShape';
import { ShapesState, ShapeType, ShapesAction } from '../types/shapes';
import { Action } from '../actions';

export const shapesInitialState: ShapesState = {
  rect: makeDefaultShape(ShapeType.Rect, 'rect'),
};

export default (
  state: ShapesState = shapesInitialState,
  action: Action,
): ShapesState => {
  switch (action.type) {
    case ShapesAction.UpdateUsing:
      return {
        ...state,
        [action.shapeKey]: {
          ...state[action.shapeKey],
          properties: {
            ...state[action.shapeKey].properties,
            [action.prop]: {
              ...state[action.shapeKey].properties[action.prop],
              using: action.using,
            },
          },
        },
      };
    case ShapesAction.UpdateConst:
      return {
        ...state,
        [action.shapeKey]: {
          ...state[action.shapeKey],
          properties: {
            ...state[action.shapeKey].properties,
            [action.prop]: {
              ...state[action.shapeKey].properties[action.prop],
              const: action.value || 0,
            },
          },
        },
      };
    case ShapesAction.UpdateFunction:
      return {
        ...state,
        [action.shapeKey]: {
          ...state[action.shapeKey],
          properties: {
            ...state[action.shapeKey].properties,
            [action.prop]: {
              ...state[action.shapeKey].properties[action.prop],
              fn: action.value || '',
            },
          },
        },
      };
    case ShapesAction.NewShape:
      return {
        ...state,
        [action.id]: action.shape,
      };
    case ShapesAction.DeleteShape:
      const { id } = action;
      return pickBy(state, (_, key: string): boolean => key !== id);
    default:
      return { ...state };
  }
};
