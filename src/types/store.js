// @flow

import type { PropertiesStateType } from './properties';
import type { ShapesStateType } from './shapes';
import type { OrderStateType } from './order';

export type StoreType = {
  +shapes: ShapesStateType,
  +properties: PropertiesStateType,
  +order: OrderStateType,
};
