// @flow

import type { PropertyType } from './properties';

export const SHAPE_RECT = 'SHAPE_RECT';
export const SHAPE_ELLIPSE = 'SHAPE_ELLIPSE';

export const SHAPE_UPDATE_USING = 'SHAPE_UPDATE_USING';
export type ShapeUpdateUsingType = 'SHAPE_UPDATE_USING';

export const SHAPE_UPDATE_CONST = 'SHAPE_UPDATE_CONST';
export type ShapeUpdateConstType = 'SHAPE_UPDATE_CONST';

export const SHAPE_UPDATE_CUSTOM = 'SHAPE_UPDATE_CUSTOM';
export type ShapeUpdateCustomType = 'SHAPE_UPDATE_CUSTOM';

export const SHAPE_UPDATE_FN = 'SHAPE_UPDATE_FN';
export type ShapeUpdateFunctionType = 'SHAPE_UPDATE_FN';

export const SHAPE_NEW_SHAPE = 'SHAPE_NEW_SHAPE';
export type ShapeNewShapeType = 'SHAPE_NEW_SHAPE';

export const SHAPE_DELETE_SHAPE = 'SHAPE_DELETE_SHAPE';
export type ShapeDeleteShapeType = 'SHAPE_DELETE_SHAPE';

export const SHAPE_RECT_PROPS = [
  'posX',
  'posY',
  'fillR',
  'fillG',
  'fillB',
  'width',
  'height',
  'rotation',
  'scaleX',
  'scaleY',
];

export const SHAPE_ELLIPSE_PROPS = [
  'posX',
  'posY',
  'radiusX',
  'radiusY',
  'fillR',
  'fillG',
  'fillB',
  'rotation',
  'startAngle',
  'endAngle',
  'scaleX',
  'scaleY',
];

export const shapeTypeToProperties = {
  [SHAPE_RECT]: SHAPE_RECT_PROPS,
  [SHAPE_ELLIPSE]: SHAPE_ELLIPSE_PROPS,
};

export type ShapeRectType = {
  +type: 'SHAPE_RECT',
  +name: string,
  +properties: {
    +posX: PropertyType,
    +posY: PropertyType,
    +fillR: PropertyType,
    +fillG: PropertyType,
    +fillB: PropertyType,
    +width: PropertyType,
    +height: PropertyType,
    +rotation: PropertyType,
    +scaleX: PropertyType,
    +scaleY: PropertyType,
  },
};

export type ShapeEllipseType = {
  +type: 'SHAPE_ELLIPSE',
  +name: string,
  +properties: {
    +posX: PropertyType,
    +posY: PropertyType,
    +radiusX: PropertyType,
    +radiusY: PropertyType,
    +fillR: PropertyType,
    +fillG: PropertyType,
    +fillB: PropertyType,
    +rotation: PropertyType,
    +startAngle: PropertyType,
    +endAngle: PropertyType,
    +scaleX: PropertyType,
    +scaleY: PropertyType,
  },
};

export type ShapeType = ShapeRectType | ShapeEllipseType;

export type ShapesStateType = {
  +[key: string]: ShapeType,
};
