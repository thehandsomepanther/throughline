import { Property } from './properties';

export enum ShapesAction {
  UpdateUsing = 'SHAPE_UPDATE_USING',
  UpdateConst = 'SHAPE_UPDATE_CONST',
  UpdateCustom = 'SHAPE_UPDATE_CUSTOM',
  UpdateFunction = 'SHAPE_UPDATE_FN',
  NewShape = 'SHAPE_NEW_SHAPE',
  DeleteShape = 'SHAPE_DELETE_SHAPE',
}

export enum ShapeType {
  Rect = 'SHAPE_RECT',
  Ellipse = 'SHAPE_ELLIPSE',
}

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
  [ShapeType.Rect]: SHAPE_RECT_PROPS,
  [ShapeType.Ellipse]: SHAPE_ELLIPSE_PROPS,
};

export interface ShapeProperties {
  posX: Property,
  posY: Property,
  fillR: Property,
  fillG: Property,
  fillB: Property,
  width: Property,
  height: Property,
  rotation: Property,
  scaleX: Property,
  scaleY: Property,
}

export interface Shape {
  type: ShapeType,
  name: string,
  children?: Array<string>,
  properties: ShapeProperties,
};

export type ShapesState = {
  [key: string]: Shape,
};
