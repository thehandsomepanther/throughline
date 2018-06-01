// @flow

import type { PropertyValuesType } from './properties';

export const SHAPE_VALUES_SET_VALUES = 'SHAPE_VALUES_SET_VALUES';
export type ShapeValuesSetValuesType = 'SHAPE_VALUES_SET_VALUES';

export const SHAPE_VALUES_UPDATE_VALUES = 'SHAPE_VALUES_UPDATE_VALUES';
export type ShapeValuesUpdateValuesType = 'SHAPE_VALUES_UPDATE_VALUES';

export type ShapeRectValuesType = {
  +type: 'SHAPE_RECT',
  +name: string,
  +posX: PropertyValuesType,
  +posY: PropertyValuesType,
  +fillR: PropertyValuesType,
  +fillG: PropertyValuesType,
  +fillB: PropertyValuesType,
  +width: PropertyValuesType,
  +height: PropertyValuesType,
  +rotation: PropertyValuesType,
};

export type ShapeEllipseValuesType = {
  +type: 'SHAPE_ELLIPSE',
  +name: string,
  +posX: PropertyValuesType,
  +posY: PropertyValuesType,
  +radiusX: PropertyValuesType,
  +radiusY: PropertyValuesType,
  +fillR: PropertyValuesType,
  +fillG: PropertyValuesType,
  +fillB: PropertyValuesType,
  +rotation: PropertyValuesType,
  +startAngle: PropertyValuesType,
  +endAngle: PropertyValuesType,
};

export type ShapeValuesType = ShapeRectValuesType | ShapeEllipseValuesType;

export type ShapeValuesStateType = {
  +[key: string]: ShapeValuesType,
};
