// @flow

import React from 'react';
import type { ShapesStateType } from '../../types/shapes';
import type { OrderStateType } from '../../types/order';

export default ({
  shapes,
  order,
}: {
  shapes: ShapesStateType,
  order: OrderStateType,
}): ?React$Element<any> => (
  <ol>
    {[...order].reverse().map((key: string): ?React$Element<any> => (
      <li key={key}>
        {key}, a {shapes[key].type}
      </li>
    ))}
  </ol>
);
