// @flow

import type { ShapesStateType } from './shapes';
import type { OrderStateType } from './order';
import type { EditorStateType } from './editor';
import type { ShapeValuesStateType } from './shapeValues';

export type StoreType = {
  +shapes: ShapesStateType,
  +order: OrderStateType,
  +editor: EditorStateType,
  +shapeValues: ShapeValuesStateType,
};

export type GetStateType = () => StoreType;
