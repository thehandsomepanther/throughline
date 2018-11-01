import { Action } from '../actions';
import { setShapeValues, updateShapeValues } from '../actions/shapeValues';
import { ShapesAction, ShapesState } from '../types/shapes';
import { EditorState } from '../types/editor';
import { addErroneousProp, removeErroneousProp } from '../actions/editor';
import { calcShapeValues, calcPropValues } from '../util/shapes';
import { Dispatch } from '../actions';

const updatePropValues = (
  dispatch: Dispatch,
  shapes: ShapesState,
  shape: string,
  prop: string,
  editor: EditorState,
) => {
  calcPropValues(shapes[shape].properties[prop], editor.numFrames)
    .then((values: Array<number>) => {
      dispatch(removeErroneousProp(shape, prop));
      dispatch(updateShapeValues(shape, prop, values));
    })
    .catch(() => {
      dispatch(addErroneousProp(shape, prop));
    });
};

export const shapesMiddleware = (store) => (next) => (action: Action) => {
  const { editor, shapes } = store.getState();

  switch (action.type) {
    case ShapesAction.NewShape:
      calcShapeValues(action.shape, editor.numFrames, () => {}).then(
        (values: { [key: string]: Array<number> }) => {
          store.dispatch(setShapeValues(action.id, values));
        },
      );
      break;
    case ShapesAction.UpdateUsing:
    case ShapesAction.UpdateConst:
    case ShapesAction.UpdateFunction:
      updatePropValues(
        store.dispatch,
        shapes,
        action.shapeKey,
        action.prop,
        editor,
      );
      break;
  }
};
