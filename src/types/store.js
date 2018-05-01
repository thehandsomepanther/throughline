// @flow

import type { ShapesStateType } from './shapes';
import type { OrderStateType } from './order';

export type StoreType = {
  +shapes: ShapesStateType,
  +order: OrderStateType,
};
