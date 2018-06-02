// @flow

import type {
  UpdateConstActionType,
  UpdateUsingActionType,
  UpdateFunctionActionType,
  AddNewShapeActionType,
} from './shapes';
import type {
  UpdateCanvasesActionType,
  ChangeActiveShapeActionType,
  AddErroneousPropActionType,
  RemoveErroneousPropActionType,
  ResetErroneousPropsActionType,
  ChangeActiveFrameActionType,
} from './editor';
import type { UpdateOrderActionType } from './order';
import type {
  ResetShapeValuesActionType,
  SetShapeValuesActionType,
  UpdateShapeValuesActionType,
} from './shapeValues';

export type ActionType =
  | UpdateConstActionType
  | UpdateUsingActionType
  | UpdateFunctionActionType
  | AddNewShapeActionType
  | UpdateCanvasesActionType
  | ChangeActiveShapeActionType
  | AddErroneousPropActionType
  | RemoveErroneousPropActionType
  | ResetErroneousPropsActionType
  | ChangeActiveFrameActionType
  | UpdateOrderActionType
  | ResetShapeValuesActionType
  | SetShapeValuesActionType
  | UpdateShapeValuesActionType;

export type DispatchType = (action: ActionType) => void;
