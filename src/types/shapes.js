// @flow

export const SHAPE_RECT = 'SHAPE_RECT';
export const SHAPE_ELLIPSE = 'SHAPE_ELLIPSE';
export const SHAPE_CIRCLE = 'SHAPE_CIRCLE';

export type ShapeRectType = 'SHAPE_RECT';
export type ShapeEllipseType = 'SHAPE_ELLIPSE';
export type ShapeCircleType = 'SHAPE_CIRCLE';

export type ShapeType = ShapeRectType | ShapeEllipseType | ShapeCircleType;

export type ShapesStateType = {
  +[key: string]: ShapeType,
};
