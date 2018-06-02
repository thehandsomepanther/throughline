// @flow

import {
  SHAPE_RECT,
  SHAPE_ELLIPSE,
  shapeTypeToProperties,
} from '../types/shapes';
import type { ShapeType } from '../types/shapes';
import { USING_CONST } from '../types/properties';
import type { PropertyType } from '../types/properties';

const defaultPropertyValues = {
  [SHAPE_RECT]: {
    posX: 250,
    posY: 250,
    width: 100,
    height: 100,
  },
  [SHAPE_ELLIPSE]: {
    posX: 300,
    posY: 300,
    radiusX: 100,
    radiusY: 100,
    startAngle: 0,
    endAngle: 2 * Math.PI,
  },
};

const shapePropsObject = (shape: string): { [key: string]: PropertyType } =>
  shapeTypeToProperties[shape].reduce(
    (
      acc: { [key: string]: PropertyType },
      property: string,
    ): { [key: string]: PropertyType } => ({
      ...acc,
      [property]: {
        using: USING_CONST,
        const: defaultPropertyValues[shape]
          ? defaultPropertyValues[shape][property] || 0
          : 0,
        custom: null, // TODO: figure out a good way to initialize this
        fn: 'return 0;',
      },
    }),
    {},
  );

export default (type: string, name: string): ShapeType => ({
  type,
  name,
  ...shapePropsObject(type),
});
