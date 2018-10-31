import { ShapesState } from './shapes';
import { OrderState } from './order';
import { EditorState } from './editor';
import { ShapeValuesState } from './shapeValues';
import { RepeatersState } from './repeaters';

export type Store = {
  shapes: ShapesState,
  order: OrderState,
  editor: EditorState,
  shapeValues: ShapeValuesState,
  repeaters: RepeatersState,
};

export type GetState = () => Store;
