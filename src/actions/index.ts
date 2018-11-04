import {
  AddErroneousPropAction,
  ChangeActiveFrameAction,
  ChangeActiveShapeAction,
  RedrawCanvasesAction,
  RemoveErroneousPropAction,
  ResetErroneousPropsAction,
  ResetRedrawCanvasesAction
} from './editor';
import { UpdateOrderAction } from './order';
import {
  AddRepeaterAction,
  DeleteRepetitionAction,
  UpdateRepeaterAction
} from './repeaters';
import {
  AddNewShapeAction,
  DeleteShapeAction,
  SetShapeValuesAction,
  UpdateConstAction,
  UpdateCustomAction,
  UpdateFunctionAction,
  UpdateShapeValuesAction,
  UpdateUsingAction
} from './shapes';

export type Action =
  | UpdateConstAction
  | UpdateUsingAction
  | UpdateCustomAction
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
