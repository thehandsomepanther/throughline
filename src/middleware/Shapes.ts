import { Action } from '../actions';
import { setShapeValues, updateShapeValues } from '../actions/shapeValues';
import { ShapesAction, ShapesState } from '../types/shapes';
import { ShapeValues } from '../types/shapeValues';
import { EditorState } from '../types/editor';
import { addErroneousProp, removeErroneousProp } from '../actions/editor';
import { calcShapeValues, calcFormulaValues } from '../util/shapes';
import { Dispatch } from '../actions';
import { Store } from '../types/store';

const updatePropValues = (
  dispatch: Dispatch,
  shapes: ShapesState,
  shape: string,
  prop: keyof ShapeValues,
  editor: EditorState
) => {
  calcFormulaValues(shapes[shape].properties[prop], editor.numFrames)
    .then((values: Array<number>) => {
      dispatch(removeErroneousProp(shape, prop));
      dispatch(updateShapeValues(shape, prop, values));
    })
    .catch(() => {
      dispatch(addErroneousProp(shape, prop));
    });
};

export const shapesMiddleware = (store: Store) => (next: Dispatch) => (
  action: Action
) => {
  const { editor, shapes } = store.getState();

  switch (action.type) {
    case ShapesAction.NewShape:
      calcShapeValues(action.shape, editor.numFrames, () => {}).then(
        (values: { [key: string]: Array<number> }) => {
          store.dispatch(setShapeValues(action.shapeID, values));
        }
      );
      break;
    case ShapesAction.UpdateUsing:
    case ShapesAction.UpdateConst:
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
