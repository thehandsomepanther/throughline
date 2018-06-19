// @flow

import type {
  UpdateConstActionType,
  UpdateUsingActionType,
  UpdateFunctionActionType,
  AddNewShapeActionType,
  DeleteShapeActionType,
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
import type {
  AddRepeaterActionType,
  DeleteRepeaterActionType,
  UpdateRepeaterActionType,
} from './repeaters';

export type ActionType =
  | UpdateConstActionType
  | UpdateUsingActionType
  | UpdateFunctionActionType
  | AddNewShapeActionType
  | DeleteShapeActionType
  | UpdateCanvasesActionType
  | ChangeActiveShapeActionType
  | AddErroneousPropActionType
  | RemoveErroneousPropActionType
  | ResetErroneousPropsActionType
  | ChangeActiveFrameActionType
  | UpdateOrderActionType
  | ResetShapeValuesActionType
  | SetShapeValuesActionType
  | UpdateShapeValuesActionType
  | AddRepeaterActionType
  | DeleteRepeaterActionType
  | UpdateRepeaterActionType;

export type DispatchType = (action: ActionType) => void;
