import { uniqueId } from 'lodash';
import { ShapesAction, ShapeType, Shape } from '../types/shapes';
import { Using } from '../types/formulas';
import makeDefaultShape from '../util/makeDefaultShape';
import { ShapeValues } from '../types/shapeValues';

export type UpdateUsingAction = {
  type: ShapesAction.UpdateUsing,
  shapeID: string,
  prop: keyof ShapeValues,
  using: Using
};
export const updateUsing = (
  shapeID: string,
  prop: keyof ShapeValues,
  using: Using
): UpdateUsingAction => ({
  type: ShapesAction.UpdateUsing,
  shapeID,
  prop,
  using
});

export type UpdateConstAction = {
  type: ShapesAction.UpdateConst,
  shapeID: string,
  prop: keyof ShapeValues,
  value: number
};
export const updateConst = (
  shapeID: string,
  prop: keyof ShapeValues,
  value: number
): UpdateConstAction => ({
  type: ShapesAction.UpdateConst,
  shapeID,
  prop,
  value
});

export type UpdateFunctionAction = {
  type: ShapesAction.UpdateFunction,
  shapeID: string,
  prop: keyof ShapeValues,
  value: string
};
export const updateFunction = (
  shapeID: string,
  prop: keyof ShapeValues,
  value: string
): UpdateFunctionAction => ({
  type: ShapesAction.UpdateFunction,
  shapeID,
  prop,
  value
});

export type AddNewShapeAction = {
  type: ShapesAction.NewShape,
  shape: Shape,
  shapeID: string
};
export const addNewShape = (
  shapeType: ShapeType,
  name: string
): AddNewShapeAction => ({
  type: ShapesAction.NewShape,
  shape: makeDefaultShape(shapeType, name),
  shapeID: uniqueId()
});

export type DeleteShapeAction = {
  type: ShapesAction.DeleteShape,
  shapeID: string
};
export const deleteShape = (shapeID: string): DeleteShapeAction => ({
  type: ShapesAction.DeleteShape,
  shapeID
});
