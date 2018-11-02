import { Formula } from './formulas';

export enum ShapesAction {
  UpdateUsing = 'SHAPE_UPDATE_USING',
  UpdateConst = 'SHAPE_UPDATE_CONST',
  UpdateCustom = 'SHAPE_UPDATE_CUSTOM',
  UpdateFunction = 'SHAPE_UPDATE_FN',
  NewShape = 'SHAPE_NEW_SHAPE',
  DeleteShape = 'SHAPE_DELETE_SHAPE',
};

// The shapes branch of the state tree maps shape IDs to their corresponding
// Shape objects.
export type ShapesState = {
  [shapeID: string]: Shape,
};

export enum ShapeType {
  Rect = 'SHAPE_RECT',
  Ellipse = 'SHAPE_ELLIPSE',
};

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

interface ShapeProperties<T> {
  posX: T,
  posY: T,
  fillR: T,
  fillG: T,
  fillB: T,
  rotation: T,
  scaleX: T,
  scaleY: T,
};

export interface RectProperties<T> extends ShapeProperties<T> {
  width: T,
  height: T,
};

export interface EllipseProperties<T> extends ShapeProperties<T> {
  radiusX: T,
  radiusY: T,
  rotation: T,
  startAngle: T,
  endAngle: T,
};

// A Shape maps a set of properties to a formula: the properties designate
// attributes of a given shape which are used to render it, and the formula
// determines how those values are determined.
export type Shape = RectShape | EllipseShape;

// This interface only exists to be extended by actual shapes which can be
// rendered.
interface VirtualShape {
  type: ShapeType,
  name: string,
  children?: Array<string>,
  properties: ShapeProperties<Formula>,
};

export interface RectShape extends VirtualShape {
  type: ShapeType.Rect,
  properties: RectProperties<Formula>,
};

export interface EllipseShape extends VirtualShape {
  type: ShapeType.Ellipse,
  properties: EllipseProperties<Formula>,
};

