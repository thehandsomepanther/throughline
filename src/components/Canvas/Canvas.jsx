// @flow
import * as React from 'react';
import { drawShape } from '../../util/shapes';
import type { ShapesStateType, ShapeType } from '../../types/shapes';
import type { OrderStateType } from '../../types/order';

type PropsType = {
  shapes: ShapesStateType,
  order: OrderStateType,
};

const NUM_FRAMES = 60;

export default class Canvas extends React.Component<PropsType> {
  constructor(props: PropsType) {
    super(props);
    this.canvases = [];
    this.canvasEls = [];
    for (let i = 0; i < NUM_FRAMES; i += 1) {
      this.canvases.push(
        <canvas
          width={600}
          height={600}
          key={i}
          ref={(canvasEl: ?HTMLCanvasElement) => {
            this.canvasEls.push(canvasEl);
          }}
        />,
      );
    }
  }

  componentDidMount() {
    this.updateCanvases();
  }

  canvasEls: Array<HTMLCanvasElement>;
  canvases: Array<React.Element<any>>;

  updateCanvases() {
    for (let i = 0; i < this.canvasEls.length; i += 1) {
      this.updateCanvas(i);
    }
  }

  updateCanvas(i: number) {
    const { shapes, order } = this.props;
    const ctx = this.canvasEls[i].getContext('2d');

    ctx.save();
    order.forEach((key: string) => {
      ctx.restore();
      const shape: ShapeType = shapes[key];
      drawShape(shape, ctx, i);
    });
  }

  render(): ?React$Element<any> {
    return <div>{this.canvases}</div>;
  }
}
