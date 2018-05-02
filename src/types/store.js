// @flow

import type { ShapesStateType } from './shapes';
import type { OrderStateType } from './order';
import type { EditorStateType } from './editor';

export type StoreType = {
  +shapes: ShapesStateType,
  +order: OrderStateType,
  +editor: EditorStateType,
};
