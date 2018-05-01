// @flow

import type { PropertiesStateType } from './properties';
import type { ShapesStateType } from './shapes';

export type StoreType = {
  +shapes: ShapesStateType,
  +properties: PropertiesStateType,
};
