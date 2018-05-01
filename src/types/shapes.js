// @flow

export const SHAPE_RECT = 'SHAPE_RECT';
export const SHAPE_ELLIPSE = 'SHAPE_ELLIPSE';

export type ShapeRectType = {
  +type: 'SHAPE_RECT',
  +xPosition: number,
  +yPosition: number,
  +fill: string,
  +width: number,
  +height: number,
};

export type ShapeEllipseType = {
  +type: 'SHAPE_ELLIPSE',
  +xPosition: number,
  +yPosition: number,
  +fill: string,
  +radiusX: number,
  +radiusY: number,
};

export type ShapeType = ShapeRectType | ShapeEllipseType;

export type ShapesStateType = {
  +[key: string]: ShapeType,
};
