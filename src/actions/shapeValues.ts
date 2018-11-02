import {
  ShapeValuesAction,
  ShapeValuesState,
  ShapeValues,
  FormulaValues
} from '../types/shapeValues';

export type ResetShapeValuesAction = {
  type: ShapeValuesAction.ResetValues,
  shapeValues: ShapeValuesState
};
export const resetShapeValues = (
  shapeValues: ShapeValuesState
): ResetShapeValuesAction => ({
  type: ShapeValuesAction.ResetValues,
  shapeValues
});

export type SetShapeValuesAction = {
  type: ShapeValuesAction.SetValues,
  shapeID: string,
  shapeValues: ShapeValues
};
export const setShapeValues = (
  shapeID: string,
  shapeValues: ShapeValues
): SetShapeValuesAction => ({
  type: ShapeValuesAction.SetValues,
  shapeID,
  shapeValues
});

export type UpdateShapeValuesAction = {
  type: ShapeValuesAction.UpdateValues,
  shapeID: string,
  prop: keyof ShapeValues,
  values: FormulaValues
};
export const updateShapeValues = (
  shapeID: string,
  prop: keyof ShapeValues,
  values: FormulaValues
): UpdateShapeValuesAction => ({
  type: ShapeValuesAction.UpdateValues,
  shapeID,
  prop,
  values
});
