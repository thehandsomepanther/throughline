// @flow

import { rgbToHex } from '../../util';

export const paintShapes = (shapeValues, order, ctx) => {
  order.forEach((key: string) => {
    ctx.save();
    const v = shapeValues[key];

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

    ctx.restore();
  });
};
