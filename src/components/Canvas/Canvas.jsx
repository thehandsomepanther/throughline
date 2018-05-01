// @flow
import * as React from 'react';
import { drawShape } from '../../util/shapes';
import type { ShapesStateType, ShapeType } from '../../types/shapes';
import type { OrderStateType } from '../../types/order';

type PropsType = {
  shapes: ShapesStateType,
  order: OrderStateType,
};

type StateType = {
  activeCanvas: number,
  interval: ?IntervalID,
};

const NUM_FRAMES = 60;

export default class Canvas extends React.Component<PropsType, StateType> {
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

    this.state = {
      activeCanvas: 0,
      interval: null,
    };
  }

  componentDidMount() {
    this.updateCanvases();

    const interval: IntervalID = setInterval(this.incrementActiveCanvas, 16);
    this.setState({ interval });
  }

  canvasEls: Array<?HTMLCanvasElement>;
  canvases: Array<React.Element<any>>;

  updateCanvases() {
    for (let i = 0; i < this.canvasEls.length; i += 1) {
      this.updateCanvas(i);
    }
  }

  updateCanvas(i: number) {
    if (!this.canvasEls[i]) {
      return;
    }

    const { shapes, order } = this.props;
    const ctx = this.canvasEls[i].getContext('2d');

    ctx.save();
    order.forEach((key: string) => {
      ctx.restore();
      const shape: ShapeType = shapes[key];
      drawShape(shape, ctx, i);
    });
  }

  handleClick = () => {
    const { interval } = this.state;
    let newInterval: IntervalID;
    if (interval !== null) {
      clearInterval(interval);
      this.setState({ interval: null });
    } else {
      newInterval = setInterval(this.incrementActiveCanvas, 16);
      this.setState({ interval: newInterval });
    }
  };

  incrementActiveCanvas = () => {
    const { activeCanvas } = this.state;
    this.setState({
      activeCanvas: (activeCanvas + 1) % NUM_FRAMES,
    });
  };

  render(): ?React$Element<any> {
    const { activeCanvas } = this.state;

    return (
      <div>
        <input type="button" value="play/pause" onClick={this.handleClick} />
        {this.canvases.map((canvas, i) => (
          <div
            style={{ display: i === activeCanvas ? 'block' : 'none' }}
            key={i}
          >
            {this.canvases[i]}
          </div>
        ))}
      </div>
    );
  }
}
