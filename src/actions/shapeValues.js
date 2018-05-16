// @flow

import { SHAPE_VALUES_UPDATE_VALUES } from '../types/shapeValues';
import type { ShapeValuesUpdateValuesType } from '../types/shapeValues';

export type UpdateShapeValuesActionType = {
  type: ShapeValuesUpdateValuesType,
  shapeValues: { [key: string]: Array<number> },
};
export type UpdateShapeValuesType = (shapeValues: {
  [key: string]: Array<number>,
}) => UpdateShapeValuesActionType;
export const updateShapeValues = (shapeValues: {
  [key: string]: Array<number>,
}): UpdateUsingActionType => ({
  type: SHAPE_VALUES_UPDATE_VALUES,
  shapeValues,
});
