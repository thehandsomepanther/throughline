import { Action } from '../actions';
import { Dispatch } from '../actions';
import { addErroneousProp, removeErroneousProp } from '../actions/editor';
import { setShapeValues, updateShapeValues } from '../actions/shapes';
import { EditorState } from '../types/editor';
import { ShapesAction, ShapesState } from '../types/shapes';
import { Store } from '../types/store';
import { calcFormulaValues, calcShapeValues } from '../util/shapes';

const updatePropValues = (
  dispatch: Dispatch,
  shapes: ShapesState,
  shape: string,
  prop: string,
  editor: EditorState
) => {
  calcFormulaValues(shapes[shape].formulas[prop], editor.numFrames)
    .then((values: number[]) => {
      dispatch(removeErroneousProp(shape, prop));
      dispatch(updateShapeValues(shape, prop as any, values));
    })
    .catch(() => {
      dispatch(addErroneousProp(shape, prop));
    });
};

export const shapesMiddleware = (store: Store) => (next: Dispatch) => (
  action: Action
) => {
  next(action);

  const { editor, shapes } = store.getState();
  switch (action.type) {
    case ShapesAction.NewShape:
      calcShapeValues(action.shape, editor.numFrames, () => { }).then(
        (values: { [key: string]: number[] }) => {
          store.dispatch(setShapeValues(action.shapeID, values));
        }
      );
      break;
    case ShapesAction.UpdateUsing:
    case ShapesAction.UpdateConst:
    case ShapesAction.UpdateCustom:
    case ShapesAction.UpdateFunction:
      updatePropValues(
        store.dispatch,
        shapes,
        action.shapeID,
        action.prop,
        editor
      );
      break;
  }
};
