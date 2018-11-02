import { RectProperties, EllipseProperties } from './shapes';

export enum ShapeValuesAction {
  ResetValues = 'SHAPE_VALUES_RESET_VALUES',
  SetValues = 'SHAPE_VALUES_SET_VALUES',
  UpdateValues = 'SHAPE_VALUES_UPDATE_VALUES',
};

// The shapeValues branch of the state tree maps shape IDs to their corresponding
// ShapeValues object
export type ShapeValuesState = {
  [shapeID: string]: ShapeValues,
};

// Calculated values for a formula are stored as an array of numbers (one for each
// frame)
export type FormulaValues = Array<number>;

export type ShapeValues = RectProperties<FormulaValues> | EllipseProperties<FormulaValues>;

