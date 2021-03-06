import { Action } from '../actions';
import { Dispatch } from '../actions';
import { addErroneousProp, removeErroneousProp } from '../actions/editor';
import { setShapeValues, updateShapeValues } from '../actions/shapes';
import { RepeatersAction, RepeatersState } from '../types/repeaters';
import { ShapesAction, ShapesState } from '../types/shapes';
import { Store } from '../types/store';
import { calcFormulaValues, calcShapeValues } from '../util/shapes';

const updatePropValues = (
  dispatch: Dispatch,
  shapes: ShapesState,
  shapeID: string,
  prop: string,
  frames: number,
  repeaters: RepeatersState,
) => {
  calcFormulaValues(shapeID, shapes[shapeID].formulas[prop], frames, repeaters)
    .then((values: number[]) => {
      dispatch(removeErroneousProp(shapeID, prop));
      dispatch(updateShapeValues(shapeID, prop as any, values));
    })
    .catch(() => {
      dispatch(addErroneousProp(shapeID, prop));
    });
};

export const shapesMiddleware = (store: Store) => (next: Dispatch) => (
  action: Action
) => {
  next(action);

  const { editor, shapes, repeaters } = store.getState();
  switch (action.type) {
    case ShapesAction.NewShape:
      calcShapeValues(action.shapeID, action.shape, editor.numFrames, repeaters, () => { }).then(
        (values: { [key: string]: number[] }) => {
          store.dispatch(setShapeValues(action.shapeID, values));
        }
      );
      break;
    case RepeatersAction.AddRootRepeater:
      calcShapeValues(action.shapeID, shapes[action.shapeID], editor.numFrames, repeaters, () => { }).then(
        (values: { [key: string]: number[] }) => {
          store.dispatch(setShapeValues(action.shapeID, values));
        }
      );
      break;
    case RepeatersAction.UpdateRepeater: {
      let parentRepeaterID = action.repeaterID;
      while (repeaters[parentRepeaterID].prev) {
        parentRepeaterID = repeaters[parentRepeaterID].prev as string;
      }

      calcShapeValues(parentRepeaterID, shapes[parentRepeaterID], editor.numFrames, repeaters, () => { }).then(
        (values: { [key: string]: number[] }) => {
          store.dispatch(setShapeValues(parentRepeaterID, values));
        }
      );
    }
      break;
    case ShapesAction.UpdateUsing:
    case ShapesAction.UpdateFormula:
      updatePropValues(
        store.dispatch,
        shapes,
        action.shapeID,
        action.prop,
        editor.numFrames,
        repeaters,
      );
      break;
  }
};
