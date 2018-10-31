import { PropertyValues } from './properties';
import { ShapeType } from './shapes';

export enum ShapeValuesAction {
  ResetValues = 'SHAPE_VALUES_RESET_VALUES',
  SetValues = 'SHAPE_VALUES_SET_VALUES',
  UpdateValues = 'SHAPE_VALUES_UPDATE_VALUES',
}

interface BaseShapeValues {
  name: string,
  properties: {
    posX: PropertyValues,
    posY: PropertyValues,
    fillR: PropertyValues,
    fillG: PropertyValues,
    fillB: PropertyValues,
    width: PropertyValues,
    height: PropertyValues,
    rotation: PropertyValues,
    scaleX: PropertyValues,
    scaleY: PropertyValues,
  },
};

export interface RectShapeValues extends BaseShapeValues {
  type: ShapeType.Rect,
};

export interface EllipseShapeValues extends BaseShapeValues {
  type: ShapeType.Ellipse,
};

export type ShapeValues = RectShapeValues | EllipseShapeValues;

export type ShapeValuesState = {
  [key: string]: ShapeValues,
};
