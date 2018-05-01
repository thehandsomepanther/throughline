// @flow
import * as React from 'react';
import { SHAPE_RECT } from '../../types/shapes';
import type { ShapesStateType, ShapeType } from '../../types/shapes';
import type { OrderStateType } from '../../types/order';

type PropsType = {
  shapes: ShapesStateType,
  order: OrderStateType,
};

export default class Canvas extends React.Component<PropsType> {
  componentDidMount() {
    this.updateCanvas();
  }

  canvasEl: ?HTMLCanvasElement;

  updateCanvas() {
    if (!this.canvasEl) {
      return;
    }
    const { shapes, order } = this.props;
    const ctx = this.canvasEl.getContext('2d');

    ctx.save();
    order.forEach((key: string) => {
      ctx.restore();
      const shape: ShapeType = shapes[key];

      switch (shape.type) {
        case SHAPE_RECT:
          ctx.fillStyle = shape.fill;
          ctx.fillRect(
            shape.xPosition,
            shape.yPosition,
            shape.width,
            shape.height,
          );
          break;
        default:
      }
    });
  }

  render(): ?React$Element<any> {
    return (
      <div>
        <canvas
          width={600}
          height={600}
          ref={(canvasEl: ?HTMLCanvasElement) => {
            this.canvasEl = canvasEl;
          }}
        />
      </div>
    );
  }
}
