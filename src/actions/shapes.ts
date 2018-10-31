import { uniqueId } from 'lodash';
import { ShapesAction, ShapesState, ShapeType } from '../types/shapes';
import {
  updateShapeValues,
  setShapeValues,
  resetShapeValues,
} from './shapeValues';
import { addErroneousProp, removeErroneousProp } from './editor';
import { EditorState } from '../types/editor';
import { Using } from '../types/properties';
import { GetState } from '../types/store';
import { Dispatch } from './';
import { calcPropValues, calcShapeValues } from '../util/shapes';
import makeDefaultShape from '../util/makeDefaultShape';

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

export type UpdateUsingAction = {
  type: ShapesAction.UpdateUsing,
  shape: string,
  prop: string,
  using: Using,
};
export const updateUsing = (
  shape: string,
  prop: string,
  using: Using,
): ((dispatch: Dispatch, getState: GetState) => void) => (
  dispatch: Dispatch,
  getState: GetState,
) => {
  dispatch({
    type: ShapesAction.UpdateUsing,
    shape,
    prop,
    using,
  });

  const { shapes, editor } = getState();
  updatePropValues(dispatch, shapes, shape, prop, editor);
};

export type UpdateConstAction = {
  type: ShapesAction.UpdateConst,
  shape: string,
  prop: string,
  value: number,
};
export const updateConst = (
  shape: string,
  prop: string,
  value: number,
): ((dispatch: Dispatch, getState: GetState) => void) => (
  dispatch: Dispatch,
  getState: GetState,
) => {
  dispatch({
    type: ShapesAction.UpdateConst,
    shape,
    prop,
    value,
  });

  const { shapes, editor } = getState();
  updatePropValues(dispatch, shapes, shape, prop, editor);
};

export type UpdateFunctionAction = {
  type: ShapesAction.UpdateFunction,
  shape: string,
  prop: string,
  value: string,
};
export const updateFunction = (
  shape: string,
  prop: string,
  value: string,
): ((dispatch: Dispatch, getState: GetState) => void) => (
  dispatch: Dispatch,
  getState: GetState,
) => {
  dispatch({
    type: ShapesAction.UpdateFunction,
    shape,
    prop,
    value,
  });

  const { shapes, editor } = getState();
  updatePropValues(dispatch, shapes, shape, prop, editor);
};

export type AddNewShapeAction = {
  type: ShapesAction.NewShape,
  shape: ShapeType,
  id: string,
};
export const addNewShape = (
  shapeType: ShapeType,
  name: string,
): ((dispatch: Dispatch, getState: GetState) => void) => (
  dispatch: Dispatch,
  getState: GetState,
) => {
  const shapeId = uniqueId();
  const newShape = makeDefaultShape(shapeType, name);

  dispatch({
    type: ShapesAction.NewShape,
    shape: newShape,
    id: shapeId,
  });

  const { editor } = getState();
  calcShapeValues(newShape, editor.numFrames, () => {}).then(
    (values: { [key: string]: Array<number> }) => {
      dispatch(
        setShapeValues(shapeId, { type: shapeType, properties: values }),
      );
    },
  );
};

export type DeleteShapeAction = {
  type: ShapesAction.DeleteShape,
  id: string,
};
export const deleteShape = (
  id: string,
): ((dispatch: Dispatch, getState: GetState) => void) => (
  dispatch: Dispatch,
  getState: GetState,
) => {
  dispatch({
    type: ShapesAction.DeleteShape,
    id,
  });

  const { shapeValues } = getState();
  dispatch(resetShapeValues({ ...shapeValues }));
};
