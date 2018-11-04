import { uniqueId } from 'lodash';
import { ConstValue, CustomValue, FunctionValue, Using } from '../types/formulas';
import { EllipseProperties, FormulaValues, RectProperties, Shape, ShapesAction, ShapeType } from '../types/shapes';
import makeDefaultShape from '../util/makeDefaultShape';

export interface UpdateUsingAction {
  type: ShapesAction.UpdateUsing;
  shapeID: string;
  prop: keyof RectProperties<any> | keyof EllipseProperties<any>;
  using: Using;
}
export const updateUsing = (
  shapeID: string,
  prop: keyof RectProperties<any> | keyof EllipseProperties<any>,
  using: Using
): UpdateUsingAction => ({
  type: ShapesAction.UpdateUsing,
  shapeID,
  prop,
  using
});

export interface UpdateConstAction {
  type: ShapesAction.UpdateConst;
  shapeID: string;
  prop: keyof RectProperties<any> | keyof EllipseProperties<any>;
  value: ConstValue;
}
export const updateConst = (
  shapeID: string,
  prop: keyof RectProperties<any> | keyof EllipseProperties<any>,
  value: ConstValue
): UpdateConstAction => ({
  type: ShapesAction.UpdateConst,
  shapeID,
  prop,
  value
});

export interface UpdateFunctionAction {
  type: ShapesAction.UpdateFunction;
  shapeID: string;
  prop: keyof RectProperties<any> | keyof EllipseProperties<any>;
  value: FunctionValue;
}
export const updateFunction = (
  shapeID: string,
  prop: keyof RectProperties<any> | keyof EllipseProperties<any>,
  value: FunctionValue,
): UpdateFunctionAction => ({
  type: ShapesAction.UpdateFunction,
  shapeID,
  prop,
  value
});

export interface UpdateCustomAction {
  type: ShapesAction.UpdateCustom;
  shapeID: string;
  prop: keyof RectProperties<any> | keyof EllipseProperties<any>;
  value: CustomValue;
}
export const updateCustom = (
  shapeID: string,
  prop: keyof RectProperties<any> | keyof EllipseProperties<any>,
  value: CustomValue,
): UpdateCustomAction => ({
  type: ShapesAction.UpdateCustom,
  shapeID,
  prop,
  value
});

export interface AddNewShapeAction {
  type: ShapesAction.NewShape;
  shape: Shape;
  shapeID: string;
}
export const addNewShape = (
  shapeType: ShapeType,
  name: string,
): AddNewShapeAction => ({
  type: ShapesAction.NewShape,
  shape: makeDefaultShape(shapeType, name),
  shapeID: uniqueId()
});

export interface DeleteShapeAction {
  type: ShapesAction.DeleteShape;
  shapeID: string;
}
export const deleteShape = (shapeID: string): DeleteShapeAction => ({
  type: ShapesAction.DeleteShape,
  shapeID
});

// TODO: This typing is as generous as possible until I figure out a better way to
// type these.
export interface SetShapeValuesAction {
  type: ShapesAction.SetValues;
  shapeID: string;
  values: Partial<RectProperties<FormulaValues> & EllipseProperties<FormulaValues>>;
}
export const setShapeValues = (
  shapeID: string,
  values: Partial<RectProperties<FormulaValues> & EllipseProperties<FormulaValues>>
): SetShapeValuesAction => ({
  type: ShapesAction.SetValues,
  shapeID,
  values,
});

export interface UpdateShapeValuesAction {
  type: ShapesAction.UpdateValues;
  shapeID: string;
  prop: keyof RectProperties<any> | keyof EllipseProperties<any>;
  values: FormulaValues;
}
export const updateShapeValues = (
  shapeID: string,
  prop: keyof RectProperties<any> | keyof EllipseProperties<any>,
  values: FormulaValues
): UpdateShapeValuesAction => ({
  type: ShapesAction.UpdateValues,
  shapeID,
  prop,
  values
});
