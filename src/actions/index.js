// @flow

import type {
  UpdateConstActionType,
  UpdateUsingActionType,
  UpdateFunctionActionType,
} from './shapes';
import type {
  UpdateCanvasesActionType,
  ChangeActiveShapeActionType,
  AddErroneousPropActionType,
  ResetErroneousPropsActionType,
} from './editor';
import type { UpdateOrderActionType } from './order';
import type { UpdateShapeValuesActionType } from './shapeValues';

export type ActionType =
  | UpdateConstActionType
  | UpdateUsingActionType
  | UpdateFunctionActionType
  | UpdateCanvasesActionType
  | ChangeActiveShapeActionType
  | AddErroneousPropActionType
  | ResetErroneousPropsActionType
  | UpdateOrderActionType
  | UpdateShapeValuesActionType;
