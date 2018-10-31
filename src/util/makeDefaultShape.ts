import {
  ShapeType,
  shapeTypeToProperties,
  Shape,
  ShapeProperties,
} from '../types/shapes';
import { Using, Property } from '../types/properties';

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
const shapePropsObject = (shape: ShapeType): ShapeProperties =>
  shapeTypeToProperties[shape].reduce(
    (
      acc: { [key: string]: Property },
      property: string,
    ): { [key: string]: Property } => ({
      ...acc,
      [property]: {
        using: Using.Constant,
        const: defaultPropertyValues[shape]
          ? defaultPropertyValues[shape][property] || 0
          : 0,
        custom: null, // TODO: figure out a good way to initialize this
        fn: 'return 0;',
      },
    }),
    {},
  ) as ShapeProperties;

export default (type: ShapeType, name: string): Shape => ({
  type,
  name,
  properties: shapePropsObject(type),
});
