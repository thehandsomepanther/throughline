import { Formula, Using } from '../types/formulas';
import {
  EllipseProperties,
  FormulaValues,
  RectProperties,
  Shape,
  ShapeProperties,
  ShapeType,
  shapeTypeToProperties,
} from '../types/shapes';

const defaultPropertyValues = {
  [ShapeType.Rect]: {
    posX: 250,
    posY: 250,
    width: 100,
    height: 100,
    scaleX: 1,
    scaleY: 1,
  },
  [ShapeType.Ellipse]: {
    posX: 300,
    posY: 300,
    radiusX: 100,
    radiusY: 100,
    startAngle: 0,
    endAngle: '2 * Math.PI',
    scaleX: 1,
    scaleY: 1,
  },
};

// TODO: typescript is (understandably) not able to type this properly because it relies
// on the value of shapeTypeToProperties at runtime. there is probably a better way to do
// this
const shapePropsObject = (shape: ShapeType): ShapeProperties<Formula> =>
  shapeTypeToProperties[shape].reduce(
    (
      acc: { [key: string]: Formula },
      property: string,
    ): { [key: string]: Formula } => ({
      ...acc,
      [property]: {
        using: Using.Constant,
        const: defaultPropertyValues[shape]
          ? defaultPropertyValues[shape][property] || 0
          : 0,
        custom: [], // TODO: figure out a good way to initialize this
        fn: 'return 0;',
      },
    }),
    {},
  ) as ShapeProperties<Formula>;

export default (type: ShapeType, name: string): Shape => {
  if (type === ShapeType.Ellipse) {
    return {
      type: ShapeType.Ellipse,
      name,
      formulas: shapePropsObject(type) as EllipseProperties<Formula>,
      values: {} as EllipseProperties<FormulaValues>
    }
  } else if (type === ShapeType.Rect) {
    return {
      type: ShapeType.Rect,
      name,
      formulas: shapePropsObject(type) as RectProperties<Formula>,
      values: {} as RectProperties<FormulaValues>
    }
  }

  throw(new Error(''))
}