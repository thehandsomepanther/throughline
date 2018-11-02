import {
  UpdateConstAction,
  UpdateUsingAction,
  UpdateFunctionAction,
  AddNewShapeAction,
  DeleteShapeAction,
  SetShapeValuesAction,
  UpdateShapeValuesAction
} from './shapes';
import {
  RedrawCanvasesAction,
  ResetRedrawCanvasesAction,
  ChangeActiveShapeAction,
  AddErroneousPropAction,
  RemoveErroneousPropAction,
  ResetErroneousPropsAction,
  ChangeActiveFrameAction
} from './editor';
import { UpdateOrderAction } from './order';
import {
  AddRepeaterAction,
  DeleteRepetitionAction,
  UpdateRepeaterAction
} from './repeaters';

export type Action =
  | UpdateConstAction
  | UpdateUsingAction
  | UpdateFunctionAction
  | AddNewShapeAction
  | DeleteShapeAction
  | SetShapeValuesAction
  | UpdateShapeValuesAction
  | RedrawCanvasesAction
  | ResetRedrawCanvasesAction
  | ChangeActiveShapeAction
  | AddErroneousPropAction
  | RemoveErroneousPropAction
  | ResetErroneousPropsAction
  | ChangeActiveFrameAction
  | UpdateOrderAction
  | AddRepeaterAction
  | DeleteRepetitionAction
  | UpdateRepeaterAction;

export type Dispatch = (action: Action) => void;
