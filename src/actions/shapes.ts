import { uniqueId } from 'lodash';
import { ShapesAction, ShapeType, Shape, FormulaValues, RectProperties, EllipseProperties } from '../types/shapes';
import { Using } from '../types/formulas';
import makeDefaultShape from '../util/makeDefaultShape';

export type UpdateUsingAction = {
  type: ShapesAction.UpdateUsing,
  shapeID: string,
  prop: keyof RectProperties<any> & EllipseProperties<any>,
  using: Using
};
export const updateUsing = (
  shapeID: string,
  prop: keyof RectProperties<any> & EllipseProperties<any>,
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
  prop: keyof RectProperties<any> & EllipseProperties<any>,
  value: number
};
export const updateConst = (
  shapeID: string,
  prop: keyof RectProperties<any> & EllipseProperties<any>,
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
  prop: keyof RectProperties<any> & EllipseProperties<any>,
  value: string
};
export const updateFunction = (
  shapeID: string,
  prop: keyof RectProperties<any> & EllipseProperties<any>,
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

// TODO: This typing is as generous as possible until I figure out a better way to
// type these.
export type SetShapeValuesAction = {
  type: ShapesAction.SetValues,
  shapeID: string,
  values: Partial<RectProperties<FormulaValues> & EllipseProperties<FormulaValues>>
};
export const setShapeValues = (
  shapeID: string,
  values: Partial<RectProperties<FormulaValues> & EllipseProperties<FormulaValues>>
): SetShapeValuesAction => ({
  type: ShapesAction.SetValues,
  shapeID,
  values,
});

export type UpdateShapeValuesAction = {
  type: ShapesAction.UpdateValues,
  shapeID: string,
  prop: keyof RectProperties<any> & EllipseProperties<any>,
  values: FormulaValues
};
export const updateShapeValues = (
  shapeID: string,
  prop: keyof RectProperties<any> & EllipseProperties<any>,
  values: FormulaValues
): UpdateShapeValuesAction => ({
  type: ShapesAction.UpdateValues,
  shapeID,
  prop,
  values
});
