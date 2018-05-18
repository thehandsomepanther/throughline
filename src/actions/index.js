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
  ChangeActiveFrameActionType,
} from './editor';
import type { UpdateOrderActionType } from './order';
import type {
  SetShapeValuesActionType,
  UpdateShapeValuesActionType,
} from './shapeValues';

export type ActionType =
  | UpdateConstActionType
  | UpdateUsingActionType
  | UpdateFunctionActionType
  | UpdateCanvasesActionType
  | ChangeActiveShapeActionType
  | AddErroneousPropActionType
  | ResetErroneousPropsActionType
  | ChangeActiveFrameActionType
  | UpdateOrderActionType
  | SetShapeValuesActionType
  | UpdateShapeValuesActionType;

export type DispatchType = (action: ActionType) => void;
