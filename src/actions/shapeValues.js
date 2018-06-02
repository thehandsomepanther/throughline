// @flow

import {
  SHAPE_VALUES_RESET_VALUES,
  SHAPE_VALUES_SET_VALUES,
  SHAPE_VALUES_UPDATE_VALUES,
} from '../types/shapeValues';
import type {
  ShapeValuesResetValuesType,
  ShapeValuesSetValuesType,
  ShapeValuesUpdateValuesType,
} from '../types/shapeValues';

export type ResetShapeValuesActionType = {
  type: ShapeValuesResetValuesType,
  shapeValues: { [key: string]: Array<number> },
};
export type ResetShapeValuesType = (shapeValues: {
  [key: string]: Array<number>,
}) => ResetShapeValuesActionType;
export const resetShapeValues = (shapeValues: {
  [key: string]: Array<number>,
}): ResetShapeValuesActionType => ({
  type: SHAPE_VALUES_RESET_VALUES,
  shapeValues,
});

export type SetShapeValuesActionType = {
  type: ShapeValuesSetValuesType,
  shape: string,
  shapeValues: { [key: string]: Array<number> },
};
export type SetShapeValuesType = (
  shape: string,
  shapeValues: {
    [key: string]: Array<number>,
  },
) => SetShapeValuesActionType;
export const setShapeValues = (
  shape: string,
  shapeValues: {
    [key: string]: Array<number>,
  },
): SetShapeValuesActionType => ({
  type: SHAPE_VALUES_SET_VALUES,
  shape,
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
