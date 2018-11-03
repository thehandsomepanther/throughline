import { Action } from '../actions';
import { EditorState } from './editor';
import { OrderState } from './order';
import { RepeatersState } from './repeaters';
import { ShapesState } from './shapes';

export interface Store {
  shapes: ShapesState;
  order: OrderState;
  editor: EditorState;
  repeaters: RepeatersState;
  getState: GetState;
  dispatch: (action: Action) => void;
}

export type GetState = () => Store;
