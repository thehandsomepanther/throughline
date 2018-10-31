import {
  UpdateConstAction,
  UpdateUsingAction,
  UpdateFunctionAction,
  AddNewShapeAction,
  DeleteShapeAction,
} from './shapes';
import {
  RedrawCanvasesAction,
  ResetRedrawCanvasesAction,
  ChangeActiveShapeAction,
  AddErroneousPropAction,
  RemoveErroneousPropAction,
  ResetErroneousPropsAction,
  ChangeActiveFrameAction,
} from './editor';
import { UpdateOrderAction } from './order';
import {
  ResetShapeValuesAction,
  SetShapeValuesAction,
  UpdateShapeValuesAction,
} from './shapeValues';
import {
  AddRepeaterAction,
  DeleteRepetitionAction,
  UpdateRepeaterAction,
} from './repeaters';

export type Action =
  | UpdateConstAction
  | UpdateUsingAction
  | UpdateFunctionAction
  | AddNewShapeAction
  | DeleteShapeAction
  | RedrawCanvasesAction
  | ResetRedrawCanvasesAction
  | ChangeActiveShapeAction
  | AddErroneousPropAction
  | RemoveErroneousPropAction
  | ResetErroneousPropsAction
  | ChangeActiveFrameAction
  | UpdateOrderAction
  | ResetShapeValuesAction
  | SetShapeValuesAction
  | UpdateShapeValuesAction
  | AddRepeaterAction
  | DeleteRepetitionAction
  | UpdateRepeaterAction;

export type Dispatch = (action: Action) => void;
