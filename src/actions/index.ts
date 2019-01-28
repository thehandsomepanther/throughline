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
  AddChildRepeaterAction,
  AddRootRepeaterAction,
  DeleteRepeaterAction,
  UpdateRepeaterAction
} from './repeaters';
import {
  AddNewShapeAction,
  DeleteShapeAction,
  SetShapeValuesAction,
  ToggleShapeVisibleAction,
  UpdateFormulaAction,
  UpdateShapeValuesAction,
  UpdateUsingAction
} from './shapes';

export type Action =
  | UpdateUsingAction
  | UpdateFormulaAction
  | AddNewShapeAction
  | DeleteShapeAction
  | SetShapeValuesAction
  | UpdateShapeValuesAction
  | ToggleShapeVisibleAction
  | RedrawCanvasesAction
  | ResetRedrawCanvasesAction
  | ChangeActiveShapeAction
  | AddErroneousPropAction
  | RemoveErroneousPropAction
  | ResetErroneousPropsAction
  | ChangeActiveFrameAction
  | UpdateOrderAction
  | AddRootRepeaterAction
  | AddChildRepeaterAction
  | DeleteRepeaterAction
  | UpdateRepeaterAction;

export type Dispatch = (action: Action) => void;
