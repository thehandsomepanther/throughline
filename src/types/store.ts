import { ShapesState } from './shapes';
import { OrderState } from './order';
import { EditorState } from './editor';
import { ShapeValuesState } from './shapeValues';
import { RepeatersState } from './repeaters';
import { Action } from '../actions';

export interface Store {
  shapes: ShapesState;
  order: OrderState;
  editor: EditorState;
  shapeValues: ShapeValuesState;
  repeaters: RepeatersState;
  getState: () => Store;
  dispatch: (action: Action) => void;
};

export type GetState = () => Store;
