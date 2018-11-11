import { ConstFormula, CustomFormula, FunctionFormula, FunctionValue, Using } from '../../types/formulas';
import { OrderState } from '../../types/order';
import { Repeater, RepeatersState } from '../../types/repeaters';
import { ShapesState, ShapeType } from '../../types/shapes';
import { rgbToHex } from '../../util';

export const getShapeFormulaValue = (
  formula: ConstFormula | CustomFormula | FunctionFormula,
  frame: number,
  functionArguments: number[],
): number => {
  if (formula.using === Using.Constant || formula.using === Using.Custom) {
    return formula.values[frame];
  }

  if (!functionArguments.length) {
    return formula.values[frame] as number;
  }

  let values: FunctionValue | number[] | null = null;
  for (const functionArgument of functionArguments.reverse()) {
    if (!values) {
      values = formula.values[functionArgument] as any;
    } else {
      values = values[functionArgument] as any;
    }
  }

  if (values == null) {
    throw new Error('Wrong number of function arguments supplied.');
  }

  const value = values[frame];
  if (typeof value !== 'number') {
    throw new Error('Wrong number of function arguments supplied.');
  }

  return value;
}

const paintShape = (
  ctx: CanvasRenderingContext2D,
  shapeID: string,
  shapes: ShapesState,
  repeaters: RepeatersState,
  repeater: Repeater | null,
  frame: number,
  ...functionArguments: number[]
) => {
  // If there's still another level of repetition we need to paint, then we recur.
  if (repeater) {
    const nextRepeater = repeater.next ? repeaters[repeater.next] : null;
    for (let i = 0; i < repeater.times; i++) {
      paintShape(ctx, shapeID, shapes, repeaters, nextRepeater, frame, ...functionArguments, i);
    }

    return;
  }

  // Otherwise, we've done all the repetition necessary and we can proceed to drawing
  // this shape to the canvas.
  ctx.save();

  const sv = (formula: ConstFormula | CustomFormula | FunctionFormula) =>
    (getShapeFormulaValue(formula, frame, functionArguments));

  const shape = shapes[shapeID];
  const posX = sv(shape.formulas.posX);
  const posY = sv(shape.formulas.posY);
  const fillR = sv(shape.formulas.fillR);
  const fillG = sv(shape.formulas.fillG);
  const fillB = sv(shape.formulas.fillB);
  const rotation = sv(shape.formulas.rotation);

  if (shape.type === ShapeType.Rect) {
    const width = sv(shape.formulas.width);
    const height = sv(shape.formulas.height);
    const scaleX = sv(shape.formulas.scaleX);
    const scaleY = sv(shape.formulas.scaleY);

    ctx.translate(posX + width / 2, posY + height / 2);
    ctx.rotate(rotation);
    ctx.translate(-(posX + width / 2), -(posY + height / 2));
    ctx.fillStyle = rgbToHex(fillR, fillG, fillB);
    ctx.fillRect(posX, posY, width * scaleX, height * scaleY);
  } else if (shape.type === ShapeType.Ellipse) {
    const radiusX = sv(shape.formulas.radiusX);
    const radiusY = sv(shape.formulas.radiusY);
    const startAngle = sv(shape.formulas.startAngle);
    const endAngle = sv(shape.formulas.endAngle);

    ctx.beginPath();
    ctx.fillStyle = rgbToHex(fillR, fillG, fillB);
    ctx.ellipse(posX, posY, radiusX, radiusY, rotation, startAngle, endAngle);
    ctx.fill();
    ctx.closePath();
  }
  ctx.restore();
}

// Paints a given canvas context with the values of shapes at a given frame.
export const paintShapesAtFrame = (
  ctx: CanvasRenderingContext2D,
  shapes: ShapesState,
  order: OrderState,
  repeaters: RepeatersState,
  frame: number,
) => {
  for (const shapeID of order) {
    if (!shapes[shapeID].visible) {
      continue;
    }

    paintShape(ctx, shapeID, shapes, repeaters, repeaters[shapeID], frame);
  }
};
