// @flow

import type { ShapesStateType } from './shapes';
import type { OrderStateType } from './order';
import type { EditorStateType } from './editor';
import type { ShapeValuesStateType } from './shapeValues';
import type { RepeatersStateType } from './repeaters';

export type StoreType = {
  +shapes: ShapesStateType,
  +order: OrderStateType,
  +editor: EditorStateType,
  +shapeValues: ShapeValuesStateType,
  +repeaters: RepeatersStateType,
};

export type GetStateType = () => StoreType;
