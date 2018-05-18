// @flow

import {
  SHAPE_VALUES_SET_VALUES,
  SHAPE_VALUES_UPDATE_VALUES,
} from '../types/shapeValues';
import type {
  ShapeValuesSetValuesType,
  ShapeValuesUpdateValuesType,
} from '../types/shapeValues';

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

export type UpdateShapeValuesActionType = {
  type: ShapeValuesUpdateValuesType,
  shape: string,
  prop: string,
  values: Array<number>,
};
export type UpdateShapeValuesType = (
  shape: string,
  prop: string,
  values: Array<number>,
) => UpdateShapeValuesActionType;
export const updateShapeValues = (
  shape: string,
  prop: string,
  values: Array<number>,
): UpdateShapeValuesActionType => ({
  type: SHAPE_VALUES_UPDATE_VALUES,
  shape,
  prop,
  values,
});
