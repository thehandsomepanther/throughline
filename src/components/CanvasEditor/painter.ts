import { OrderState } from '../../types/order';
import { RepeatersState } from '../../types/repeaters';
import { ShapeType } from '../../types/shapes';
import { rgbToHex } from '../../util';

export const paintShapes = (
  // TODO: this isn't a very good description of this type. refactor this
  shapeValues: {
    [key: string]: {
      type: ShapeType,
      properties: {
        [key: string]: number,
      },
    },
  },
  order: OrderState,
  repeaters: RepeatersState,
  ctx: CanvasRenderingContext2D,
) => {
  order.forEach((key: string) => {
    ctx.save();
    const v = { ...shapeValues[key] };
    const p = { ...v.properties };

    switch (v.type) {
      case ShapeType.Rect:
        ctx.translate(p.posX + p.width / 2, p.posY + p.height / 2);
        ctx.rotate(p.rotation);
        ctx.translate(-(p.posX + p.width / 2), -(p.posY + p.height / 2));
        ctx.fillStyle = rgbToHex(p.fillR, p.fillG, p.fillB);
        ctx.fillRect(p.posX, p.posY, p.width * p.scaleX, p.height * p.scaleY);
        break;
      case ShapeType.Ellipse:
        ctx.beginPath();
        ctx.fillStyle = rgbToHex(p.fillR, p.fillG, p.fillB);
        ctx.ellipse(
          p.posX,
          p.posY,
          p.radiusX,
          p.radiusY,
          p.rotation,
          p.startAngle,
          p.endAngle,
        );
        ctx.fill();
        ctx.closePath();
        break;
      default:
        throw new Error(`Unexpected shape type: ${v.type}`);
    }

    ctx.restore();
  });
};
