import { OrderState } from '../../types/order';
import { RepeatersState } from '../../types/repeaters';
import { ShapesState, ShapeType } from '../../types/shapes';
import { rgbToHex } from '../../util';

// Paints a given canvas context with the values of shapes at a given frame.
export const paintShapesAtFrame = (
  shapes: ShapesState,
  order: OrderState,
  repeaters: RepeatersState,
  frame: number,
  ctx: CanvasRenderingContext2D
) => {
  for (const shapeID of order) {
    ctx.save();
    const shape = shapes[shapeID];
    if (shape.type === ShapeType.Rect) {
      const sv = shape.values;
      ctx.translate(
        sv.posX[frame] + sv.width[frame] / 2,
        sv.posY[frame] + sv.height[frame] / 2
      );
      ctx.rotate(sv.rotation[frame]);
      ctx.translate(
        -(sv.posX[frame] + sv.width[frame] / 2),
        -(sv.posY[frame] + sv.height[frame] / 2)
      );
      ctx.fillStyle = rgbToHex(
        sv.fillR[frame],
        sv.fillG[frame],
        sv.fillB[frame]
      );
      ctx.fillRect(
        sv.posX[frame],
        sv.posY[frame],
        sv.width[frame] * sv.scaleX[frame],
        sv.height[frame] * sv.scaleY[frame]
      );
    } else if (shape.type === ShapeType.Ellipse) {
      const sv = shape.values;
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
    }

    ctx.restore();
  }
};
