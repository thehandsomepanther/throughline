// @flow

import { shapeTypeToProperties } from '../types/shapes';
import type { RepeaterType } from '../types/repeaters';

export default (type: string): RepeaterType =>
  shapeTypeToProperties[type].reduce(
    (
      acc: { [key: string]: number },
      property: string,
    ): { [key: string]: number } => ({
      ...acc,
      [property]: 0,
    }),
    {
      times: 1,
    },
  );
