import { ConstFormula, Formula, FunctionFormula } from './formulas';

export enum ShapesAction {
  UpdateUsing = 'SHAPE_UPDATE_USING',
  UpdateFormula = 'SHAPE_UPDATE_FORMULA',
  NewShape = 'SHAPE_NEW_SHAPE',
  DeleteShape = 'SHAPE_DELETE_SHAPE',
  SetValues = 'SHAPE_SET_VALUES',
  UpdateValues = 'SHAPE_UPDATE_VALUES',
  ToggleVisible = 'SHAPE_TOGGLE_VISIBLE',
};

// The shapes branch of the state tree maps shape IDs to their corresponding
// Shape objects.
export interface ShapesState {
  [shapeID: string]: Shape;
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
  'strokeR',
  'strokeG',
  'strokeB',
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
  'strokeR',
  'strokeG',
  'strokeB',
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

export interface ShapeProperties<T> {
  posX: T;
  posY: T;
  fillR: T;
  fillG: T;
  fillB: T;
  strokeR: T;
  strokeG: T;
  strokeB: T;
  rotation: T;
  scaleX: T;
  scaleY: T;
};

export interface RectProperties<T> extends ShapeProperties<T> {
  width: T;
  height: T;
};

export interface EllipseProperties<T> extends ShapeProperties<T> {
  radiusX: T;
  radiusY: T;
  rotation: T;
  startAngle: T;
  endAngle: T;
};

// A Shape maps a set of properties to a formula: the properties designate
// attributes of a given shape which are used to render it, and the formula
// determines how those values are determined.
export type Shape = RectShape | EllipseShape;

// This interface only exists to be extended by actual shapes which can be
// rendered.
interface VirtualShape {
  type: ShapeType;
  name: string;
  children?: string[];
  formulas: ShapeProperties<Formula>;
  visible: boolean;
};

export interface RectShape extends VirtualShape {
  type: ShapeType.Rect;
  formulas: RectProperties<ConstFormula | FunctionFormula>;
};

export interface EllipseShape extends VirtualShape {
  type: ShapeType.Ellipse;
  formulas: EllipseProperties<ConstFormula | FunctionFormula>;
};
