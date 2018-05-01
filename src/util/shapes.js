// @flow

import { USING_CONST, USING_CUSTOM, USING_FN } from '../types/properties';
import { SHAPE_RECT } from '../types/shapes';
import { rgbToHex } from './';
import type { ShapeType } from '../types/shapes';
import type { PropertyType } from '../types/properties';

export const unpackProperty = (prop: PropertyType, t: number): number => {
  switch (prop.using) {
    case USING_CONST:
      if (prop.const === null || prop.const === undefined) {
        throw new Error('Tried to use const value of prop when none exists.');
      }
      return prop.const;
    case USING_CUSTOM:
      if (!prop.custom) {
        throw new Error('Tried to use custom value of prop when none exists.');
      }
      return prop.custom[t];
    case USING_FN:
      if (!prop.fn) {
        throw new Error(
          'Tried to use function value of prop when none exists.',
        );
      }
      return prop.fn(t);
    default:
      throw new Error(`Tried to use unexpected prop: ${prop.using}`);
  }
};

export const drawShape = (
  shape: ShapeType,
  ctx: CanvasRenderingContext2D,
  t: number,
) => {
  switch (shape.type) {
    case SHAPE_RECT:
      ctx.fillStyle = rgbToHex(
        unpackProperty(shape.fillR, t),
        unpackProperty(shape.fillG, t),
        unpackProperty(shape.fillB, t),
      );
      ctx.fillRect(
        unpackProperty(shape.posX, t),
        unpackProperty(shape.posY, t),
        unpackProperty(shape.width, t),
        unpackProperty(shape.height, t),
      );
      break;
    default:
  }
};
