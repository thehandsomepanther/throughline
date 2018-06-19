// @flow

import type { OrderStateType } from '../../types/order';
import type { RepeatersStateType } from '../../types/repeaters';
import { rgbToHex } from '../../util';

export const paintShapes = (
  // TODO: this isn't a very good description of this type. refactor this
  shapeValues: { [key: string]: { [key: string]: number } },
  order: OrderStateType,
  repeaters: RepeatersStateType,
  ctx: CanvasRenderingContext2D,
) => {
  order.forEach((key: string) => {
    ctx.save();
    const v = { ...shapeValues[key] };

    if (!repeaters[key]) {
      switch (v.type) {
        case 'SHAPE_RECT':
          ctx.translate(v.posX + v.width / 2, v.posY + v.height / 2);
          ctx.rotate(v.rotation);
          ctx.translate(-(v.posX + v.width / 2), -(v.posY + v.height / 2));
          ctx.fillStyle = rgbToHex(v.fillR, v.fillG, v.fillB);
          ctx.fillRect(v.posX, v.posY, v.width * v.scaleX, v.height * v.scaleY);
          break;
        case 'SHAPE_ELLIPSE':
          ctx.beginPath();
          ctx.fillStyle = rgbToHex(v.fillR, v.fillG, v.fillB);
          ctx.ellipse(
            v.posX,
            v.posY,
            v.radiusX,
            v.radiusY,
            v.rotation,
            v.startAngle,
            v.endAngle,
          );
          ctx.fill();
          ctx.closePath();
          break;
        default:
          throw new Error(`Unexpected shape type: ${v.type}`);
      }
    } else {
      const r = repeaters[key];
      Object.keys(r).forEach((key: string) => {
        if (key === 'type' || key === 'name') {
          return;
        }

        v[key] += r[key];
      });

      console.log(r);

      for (let i = 0; i < r.times; i++) {
        switch (v.type) {
          case 'SHAPE_RECT':
            ctx.translate(v.posX + v.width / 2, v.posY + v.height / 2);
            ctx.rotate(v.rotation);
            ctx.translate(-(v.posX + v.width / 2), -(v.posY + v.height / 2));
            ctx.fillStyle = rgbToHex(v.fillR, v.fillG, v.fillB);
            ctx.fillRect(
              v.posX,
              v.posY,
              v.width * v.scaleX,
              v.height * v.scaleY,
            );
            break;
          case 'SHAPE_ELLIPSE':
            ctx.beginPath();
            ctx.fillStyle = rgbToHex(v.fillR, v.fillG, v.fillB);
            ctx.ellipse(
              v.posX,
              v.posY,
              v.radiusX,
              v.radiusY,
              v.rotation,
              v.startAngle,
              v.endAngle,
            );
            ctx.fill();
            ctx.closePath();
            break;
          default:
            throw new Error(`Unexpected shape type: ${v.type}`);
        }
      }
    }

    ctx.restore();
  });
};
