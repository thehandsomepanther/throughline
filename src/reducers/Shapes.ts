import { pickBy } from 'lodash';
import makeDefaultShape from '../util/makeDefaultShape';
import { ShapesState, ShapeType, ShapesAction } from '../types/shapes';
import { Action } from '../actions';

export const shapesInitialState: ShapesState = {
  rect: makeDefaultShape(ShapeType.Rect, 'rect')
};

export default (
  state: ShapesState = shapesInitialState,
  action: Action
): ShapesState => {
  const newState = { ...state };

  switch (action.type) {
    case ShapesAction.UpdateUsing:
      newState[action.shapeID].formulas[action.prop].using = action.using;
      return newState;
    case ShapesAction.UpdateConst:
      newState[action.shapeID].formulas[action.prop].const = action.value || 0;
      return newState;
    case ShapesAction.UpdateFunction:
      newState[action.shapeID].formulas[action.prop].using = action.value || '';
      return newState;
    case ShapesAction.NewShape:
      return {
        ...state,
        [action.shapeID]: action.shape
      };
    case ShapesAction.DeleteShape:
      return pickBy(state, (_, key: string): boolean => key !== action.shapeID);
    case ShapesAction.SetValues:
      newState[action.shapeID].values = action.values as any;
      return newState;
    case ShapesAction.UpdateValues:
      newState[action.shapeID][action.prop] = action.values;
      return newState;
    default:
      return { ...state };
  }
};
