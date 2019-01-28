import { pickBy } from 'lodash';
import { Using } from 'src/types/formulas';
import { Action } from '../actions';
import { ShapesAction, ShapesState, ShapeType } from '../types/shapes';
import makeDefaultShape from '../util/makeDefaultShape';

export const shapesInitialState: ShapesState = {
  rect: makeDefaultShape(ShapeType.Rect, 'Rectangle')
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
    case ShapesAction.UpdateFormula:
      switch (newState[action.shapeID].formulas[action.prop].using) {
        case Using.Constant:
          newState[action.shapeID].formulas[action.prop].const = action.formula;
          break;
        case Using.Function:
          newState[action.shapeID].formulas[action.prop].fn = action.formula;
          break;
      }

      return newState;
    case ShapesAction.NewShape:
      return {
        ...state,
        [action.shapeID]: action.shape
      };
    case ShapesAction.DeleteShape:
      return pickBy(state, (_, key: string): boolean => key !== action.shapeID);
    case ShapesAction.SetValues:
      for (const prop in action.values) {
        if (!action.values.hasOwnProperty(prop)) {
          continue;
        }

        newState[action.shapeID].formulas[prop].values = action.values[prop];
      }
      return newState;
    case ShapesAction.UpdateValues:
      newState[action.shapeID].formulas[action.prop].values = action.values;
      return newState;
    case ShapesAction.ToggleVisible:
      newState[action.shapeID].visible = !state[action.shapeID].visible;
    default:
      return newState;
  }
};
