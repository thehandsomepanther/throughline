// @flow

import React from 'react';
import type { ShapesStateType } from '../../types/shapes';
import type { PropertiesStateType } from '../../types/properties';

export default ({
  shapes,
  properties,
}: {
  shapes: ShapesStateType,
  properties: PropertiesStateType,
}): ?React$Element<any> => <div>editor</div>;
