import { OrderState } from '../../types/order';
import { RepeatersState } from '../../types/repeaters';
import { ShapeType, ShapesState, RectProperties, EllipseProperties } from '../../types/shapes';
import { rgbToHex } from '../../util';
import { ShapeValuesState, FormulaValues } from '../..//types/shapeValues';

// Paints a given canvas context with the values of shapes at a given frame.
export const paintShapesAtFrame = (
  shapes: ShapesState,
  shapeValues: ShapeValuesState,
  order: OrderState,
  repeaters: RepeatersState,
  frame: number,
  ctx: CanvasRenderingContext2D
) => {
  for (const shapeID of order) {
    ctx.save();
    // TODO: The typing around here is pretty atrocious. I should probably
    // figure out a better way of handling this. It may have to involve including
    // a ShapeType property in each ShapeValue
    let sv = shapeValues[shapeID]

    switch (shapes[shapeID].type) {
      case ShapeType.Rect:
        sv = sv as RectProperties<FormulaValues>;
        ctx.translate(
          sv.posX[frame] +
            sv.width[frame] / 2,
          sv.posY[frame] +
            sv.height[frame] / 2
        );
        ctx.rotate(sv.rotation[frame]);
        ctx.translate(
          -(
            sv.posX[frame] +
            sv.width[frame] / 2
          ),
          -(
            sv.posY[frame] +
            sv.height[frame] / 2
          )
        );
        ctx.fillStyle = rgbToHex(
          sv.fillR[frame],
          sv.fillG[frame],
          sv.fillB[frame]
        );
        ctx.fillRect(
          sv.posX[frame],
          sv.posY[frame],
          sv.width[frame] *
            sv.scaleX[frame],
          sv.height[frame] *
            sv.scaleY[frame]
        );
        break;
      case ShapeType.Ellipse:
        sv = sv as EllipseProperties<FormulaValues>;
        ctx.beginPath();
        ctx.fillStyle = rgbToHex(
          sv.fillR[frame],
          sv.fillG[frame],
          sv.fillB[frame]
        );
        ctx.ellipse(
          sv.posX[frame],
          sv.posY[frame],
          sv.radiusX[frame],
          sv.radiusY[frame],
          sv.rotation[frame],
          sv.startAngle[frame],
          sv.endAngle[frame]
        );
        ctx.fill();
        ctx.closePath();
        break;
      default:
        throw new Error(`Unexpected shape type: ${shapes[shapeID].type}`);
    }

    ctx.restore();
  }
};
