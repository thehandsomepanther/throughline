import { ShapesState } from './shapes';
import { OrderState } from './order';
import { EditorState } from './editor';
import { RepeatersState } from './repeaters';
import { Action } from '../actions';

export interface Store {
  shapes: ShapesState;
  order: OrderState;
  editor: EditorState;
  repeaters: RepeatersState;
  getState: GetState;
  dispatch: (action: Action) => void;
}

export type GetState = () => Store;
