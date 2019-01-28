import { FormulaValue, Using } from '../types/formulas';
import { EllipseProperties, RectProperties, Shape, ShapesAction, ShapeType } from '../types/shapes';
import { uniqueShapeID } from '../util';
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

export interface UpdateFormulaAction {
  type: ShapesAction.UpdateFormula;
  shapeID: string;
  prop: keyof RectProperties<any> | keyof EllipseProperties<any>;
  formula: string;
};
export const updateFormula = (
  shapeID: string,
  prop: keyof RectProperties<any> | keyof EllipseProperties<any>,
  formula: string,
): UpdateFormulaAction => ({
  type: ShapesAction.UpdateFormula,
  shapeID,
  prop,
  formula,
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
  shapeID: uniqueShapeID(),
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
  values: Partial<RectProperties<FormulaValue> & EllipseProperties<FormulaValue>>;
}
export const setShapeValues = (
  shapeID: string,
  values: Partial<RectProperties<FormulaValue> & EllipseProperties<FormulaValue>>
): SetShapeValuesAction => ({
  type: ShapesAction.SetValues,
  shapeID,
  values,
});

export interface UpdateShapeValuesAction {
  type: ShapesAction.UpdateValues;
  shapeID: string;
  prop: keyof RectProperties<any> | keyof EllipseProperties<any>;
  values: FormulaValue;
}
export const updateShapeValues = (
  shapeID: string,
  prop: keyof RectProperties<any> | keyof EllipseProperties<any>,
  values: FormulaValue
): UpdateShapeValuesAction => ({
  type: ShapesAction.UpdateValues,
  shapeID,
  prop,
  values
});

export interface ToggleShapeVisibleAction {
  type: ShapesAction.ToggleVisible;
  shapeID: string;
}
export const toggleShapeVisible = (shapeID: string): ToggleShapeVisibleAction => ({
  type: ShapesAction.ToggleVisible,
  shapeID,
});
