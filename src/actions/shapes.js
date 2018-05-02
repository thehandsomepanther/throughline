// @flow

import { SHAPE_UPDATE_USING, SHAPE_UPDATE_CONST } from '../types/shapes';
import type { UsingType } from '../types/properties';
import type {
  ShapeUpdateUsingType,
  ShapeUpdateConstType,
} from '../types/shapes';

export type UpdateUsingActionType = {
  type: ShapeUpdateUsingType,
  shape: string,
  property: string,
  using: UsingType,
};
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
  val: number,
};
export const updateConst = (
  shape: string,
  val: number,
): UpdateConstActionType => ({
  type: SHAPE_UPDATE_CONST,
  shape,
  val,
});
