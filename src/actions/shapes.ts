import { uniqueId } from 'lodash';
import { ShapesAction, ShapeType, Shape } from '../types/shapes';
import { Using } from '../types/formulas';
import makeDefaultShape from '../util/makeDefaultShape';

export type UpdateUsingAction = {
  type: ShapesAction.UpdateUsing,
  shapeKey: string,
  prop: string,
  using: Using,
};
export const updateUsing = (
  shapeKey: string,
  prop: string,
  using: Using,
): UpdateUsingAction => ({
  type: ShapesAction.UpdateUsing,
  shapeKey,
  prop,
  using,
});

export type UpdateConstAction = {
  type: ShapesAction.UpdateConst,
  shapeKey: string,
  prop: string,
  value: number,
};
export const updateConst = (
  shapeKey: string,
  prop: string,
  value: number,
): UpdateConstAction => ({
  type: ShapesAction.UpdateConst,
  shapeKey,
  prop,
  value,
});

export type UpdateFunctionAction = {
  type: ShapesAction.UpdateFunction,
  shapeKey: string,
  prop: string,
  value: string,
};
export const updateFunction = (
  shapeKey: string,
  prop: string,
  value: string,
): UpdateFunctionAction => ({
  type: ShapesAction.UpdateFunction,
  shapeKey,
  prop,
  value,
});

export type AddNewShapeAction = {
  type: ShapesAction.NewShape,
  shape: Shape,
  id: string,
};
export const addNewShape = (
  shapeType: ShapeType,
  name: string,
): AddNewShapeAction => ({
  type: ShapesAction.NewShape,
  shape: makeDefaultShape(shapeType, name),
  id: uniqueId(),
});

export type DeleteShapeAction = {
  type: ShapesAction.DeleteShape,
  id: string,
};
export const deleteShape = (id: string): DeleteShapeAction => ({
  type: ShapesAction.DeleteShape,
  id,
});
