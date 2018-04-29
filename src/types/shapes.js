// @flow

export type ShapeRect = "SHAPE_RECT";
export type ShapeEllipse = "SHAPE_ELLIPSE";
export type ShapeCircle = "SHAPE_CIRCLE";

export type Shape = ShapeRect | ShapeEllipse | ShapeCircle;

export type ShapesState = {
  +[key: string]: Shape
};
