import { ShapeValuesAction } from '../types/shapeValues';

export type ResetShapeValuesAction = {
  type: ShapeValuesAction.ResetValues,
  shapeValues: { [key: string]: Array<number> },
};
export const resetShapeValues = (shapeValues: {
  [key: string]: Array<number>,
}): ResetShapeValuesAction => ({
  type: ShapeValuesAction.ResetValues,
  shapeValues,
});

export type SetShapeValuesAction = {
  type: ShapeValuesAction.SetValues,
  shape: string,
  shapeValues: { [key: string]: Array<number> },
};
export const setShapeValues = (
  shape: string,
  shapeValues: {
    [key: string]: Array<number>,
  },
): SetShapeValuesAction => ({
  type: ShapeValuesAction.SetValues,
  shape,
  shapeValues,
});

export type UpdateShapeValuesAction = {
  type: ShapeValuesAction.UpdateValues,
  shape: string,
  prop: string,
  values: Array<number>,
};
export const updateShapeValues = (
  shape: string,
  prop: string,
  values: Array<number>,
): UpdateShapeValuesAction => ({
  type: ShapeValuesAction.UpdateValues,
  shape,
  prop,
  values,
});
