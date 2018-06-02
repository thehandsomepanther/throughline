// @flow

import { uniqueId } from 'lodash';
import {
  SHAPE_UPDATE_USING,
  SHAPE_UPDATE_CONST,
  SHAPE_UPDATE_FN,
  SHAPE_NEW_SHAPE,
  SHAPE_DELETE_SHAPE,
} from '../types/shapes';
import {
  updateShapeValues,
  setShapeValues,
  resetShapeValues,
} from './shapeValues';
import { addErroneousProp, removeErroneousProp } from './editor';
import type { EditorStateType } from '../types/editor';
import type { UsingType } from '../types/properties';
import type {
  ShapeUpdateUsingType,
  ShapeUpdateConstType,
  ShapeUpdateFunctionType,
  ShapesStateType,
  ShapeNewShapeType,
  ShapeDeleteShapeType,
  ShapeType,
} from '../types/shapes';
import type { GetStateType } from '../types/store';
import type { DispatchType } from './';
import { calcPropValues, calcShapeValues } from '../util/shapes';
import makeDefaultShape from '../util/makeDefaultShape';

const updatePropValues = (
  dispatch: DispatchType,
  shapes: ShapesStateType,
  shape: string,
  prop: string,
  editor: EditorStateType,
) => {
  calcPropValues(shapes[shape][prop], editor.numFrames)
    .then((values: Array<number>) => {
      dispatch(removeErroneousProp(shape, prop));
      dispatch(updateShapeValues(shape, prop, values));
    })
    .catch(() => {
      dispatch(addErroneousProp(shape, prop));
    });
};

export type UpdateUsingActionType = {
  type: ShapeUpdateUsingType,
  shape: string,
  prop: string,
  using: UsingType,
};
export type UpdateUsingType = (
  shape: string,
  prop: string,
  using: UsingType,
) => (dispatch: DispatchType, getState: GetStateType) => void;
export const updateUsing = (
  shape: string,
  prop: string,
  using: UsingType,
): ((dispatch: DispatchType, getState: GetStateType) => void) => (
  dispatch: DispatchType,
  getState: GetStateType,
) => {
  dispatch({
    type: SHAPE_UPDATE_USING,
    prop,
    shape,
    using,
  });

  const { shapes, editor } = getState();
  updatePropValues(dispatch, shapes, shape, prop, editor);
};

export type UpdateConstActionType = {
  type: ShapeUpdateConstType,
  shape: string,
  prop: string,
  value: number,
};
export type UpdateConstType = (
  shape: string,
  prop: string,
  value: number,
) => (dispatch: DispatchType, getState: GetStateType) => void;
export const updateConst = (
  shape: string,
  prop: string,
  value: number,
): ((dispatch: DispatchType, getState: GetStateType) => void) => (
  dispatch: DispatchType,
  getState: GetStateType,
) => {
  dispatch({
    type: SHAPE_UPDATE_CONST,
    shape,
    prop,
    value,
  });

  const { shapes, editor } = getState();
  updatePropValues(dispatch, shapes, shape, prop, editor);
};

export type UpdateFunctionActionType = {
  type: ShapeUpdateFunctionType,
  shape: string,
  prop: string,
  value: string,
};
export type UpdateFunctionType = (
  shape: string,
  prop: string,
  value: string,
) => (dispatch: DispatchType, getState: GetStateType) => void;
export const updateFunction = (
  shape: string,
  prop: string,
  value: string,
): ((dispatch: DispatchType, getState: GetStateType) => void) => (
  dispatch: DispatchType,
  getState: GetStateType,
) => {
  dispatch({
    type: SHAPE_UPDATE_FN,
    shape,
    prop,
    value,
  });

  const { shapes, editor } = getState();
  updatePropValues(dispatch, shapes, shape, prop, editor);
};

export type AddNewShapeActionType = {
  type: ShapeNewShapeType,
  shape: ShapeType,
  id: string,
};
export type AddNewShapeType = (
  shapeType: string,
  name: string,
) => (dispatch: DispatchType, getState: GetStateType) => void;
export const addNewShape = (
  shapeType: string,
  name: string,
): ((dispatch: DispatchType, getState: GetStateType) => void) => (
  dispatch: DispatchType,
  getState: GetStateType,
) => {
  const shapeId = uniqueId();
  const newShape = makeDefaultShape(shapeType, name);

  dispatch({
    type: SHAPE_NEW_SHAPE,
    shape: newShape,
    id: shapeId,
  });

  const { editor } = getState();
  calcShapeValues(newShape, editor.numFrames, () => {}).then(
    (values: { [key: string]: Array<number> }) => {
      dispatch(setShapeValues(shapeId, { type: shapeType, ...values }));
    },
  );
};

export type DeleteShapeActionType = {
  type: ShapeDeleteShapeType,
  id: string,
};
export type DeleteShapeType = (
  id: string,
) => (dispatch: DispatchType, getState: GetStateType) => void;
export const deleteShape = (
  id: string,
): ((dispatch: DispatchType, getState: GetStateType) => void) => (
  dispatch: DispatchType,
  getState: GetStateType,
) => {
  dispatch({
    type: SHAPE_DELETE_SHAPE,
    id,
  });

  const { shapeValues } = getState();
  dispatch(resetShapeValues({ ...shapeValues }));
};
