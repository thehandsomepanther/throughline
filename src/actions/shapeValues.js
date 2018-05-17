// @flow

import { SHAPE_VALUES_SET_VALUES } from '../types/shapeValues';
import type { ShapeValuesSetValuesType } from '../types/shapeValues';

export type SetShapeValuesActionType = {
  type: ShapeValuesSetValuesType,
  shapeValues: { [key: string]: Array<number> },
};
export type SetShapeValuesType = (shapeValues: {
  [key: string]: Array<number>,
}) => SetShapeValuesActionType;
export const setShapeValues = (shapeValues: {
  [key: string]: Array<number>,
}): SetShapeValuesActionType => ({
  type: SHAPE_VALUES_SET_VALUES,
  shapeValues,
});
