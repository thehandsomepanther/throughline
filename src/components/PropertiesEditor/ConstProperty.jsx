// @flow

import React from 'react';
import { PropertyName } from './styles';
import type { ShapeType } from '../../types/shapes';

export default (shape: ShapeType, prop: string): ?React$Element<any> => (
  <div>
    <PropertyName>{shape[prop].const}</PropertyName>
  </div>
);
