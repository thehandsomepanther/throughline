// @flow

import type { PropertyType } from './properties';

export const SHAPE_RECT = 'SHAPE_RECT';
export const SHAPE_ELLIPSE = 'SHAPE_ELLIPSE';

export type ShapeRectType = {
  +type: 'SHAPE_RECT',
  +posX: PropertyType,
  +posY: PropertyType,
  +fillR: PropertyType,
  +fillG: PropertyType,
  +fillB: PropertyType,
  +width: PropertyType,
  +height: PropertyType,
};

export type ShapeEllipseType = {
  +type: 'SHAPE_ELLIPSE',
  +posX: PropertyType,
  +posY: PropertyType,
  +fillR: PropertyType,
  +fillG: PropertyType,
  +fillB: PropertyType,
  +width: PropertyType,
  +height: PropertyType,
};

export type ShapeType = ShapeRectType | ShapeEllipseType;

export type ShapesStateType = {
  +[key: string]: ShapeType,
};
