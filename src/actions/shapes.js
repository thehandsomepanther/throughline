// @flow

import {
  SHAPE_UPDATE_USING,
  SHAPE_UPDATE_CONST,
  SHAPE_UPDATE_FN,
} from '../types/shapes';
import type { UsingType } from '../types/properties';
import type {
  ShapeUpdateUsingType,
  ShapeUpdateConstType,
  ShapeUpdateFunctionType,
} from '../types/shapes';

export type UpdateUsingActionType = {
  type: ShapeUpdateUsingType,
  shape: string,
  property: string,
  using: UsingType,
};
export type UpdateUsingType = (
  shape: string,
  property: string,
  using: UsingType,
) => UpdateUsingActionType;
export const updateUsing = (
  shape: string,
  property: string,
  using: UsingType,
): UpdateUsingActionType => ({
  type: SHAPE_UPDATE_USING,
  property,
  shape,
  using,
});

export type UpdateConstActionType = {
  type: ShapeUpdateConstType,
  shape: string,
  property: string,
  value: number,
};
export type UpdateConstType = (
  shape: string,
  property: string,
  value: number,
) => UpdateConstActionType;
export const updateConst = (
  shape: string,
  property: string,
  value: number,
): UpdateConstActionType => ({
  type: SHAPE_UPDATE_CONST,
  shape,
  property,
  value,
});

export type UpdateFunctionActionType = {
  type: ShapeUpdateFunctionType,
  shape: string,
  property: string,
  value: string,
};
export type UpdateFunctionType = (
  shape: string,
  property: string,
  value: string,
) => UpdateFunctionActionType;
export const updateFunction = (
  shape: string,
  property: string,
  value: string,
): UpdateFunctionActionType => ({
  type: SHAPE_UPDATE_FN,
  shape,
  property,
  value,
});
