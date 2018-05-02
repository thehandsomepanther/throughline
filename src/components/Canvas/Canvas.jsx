// @flow

import * as React from 'react';
import { drawShape } from '../../util/shapes';
import type { ShapesStateType, ShapeType } from '../../types/shapes';
import type { OrderStateType } from '../../types/order';
import type { EditorStateType } from '../../types/editor';
import type { UpdateCanvasesActionType } from '../../actions/editor';

type PropsType = {
  shapes: ShapesStateType,
  order: OrderStateType,
  editor: EditorStateType,
  updateCanvases: () => UpdateCanvasesActionType,
};

type StateType = {
  activeCanvas: number,
  interval: ?IntervalID,
};

const NUM_FRAMES = 60;
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;

export default class Canvas extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.canvases = [];
    this.canvasEls = [];
    for (let i = 0; i < NUM_FRAMES; i += 1) {
      this.canvases.push(
        <canvas
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
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
    this.redrawCanvases();
  }

  componentWillReceiveProps(nextProps: PropsType) {
    if (nextProps.editor.shouldUpdateCanvases) {
      this.redrawCanvases();
    }
  }

  canvases: Array<React.Element<any>>;
  canvasEls: Array<?HTMLCanvasElement>;

  redrawCanvases() {
    const { updateCanvases } = this.props;

    for (let i = 0; i < this.canvasEls.length; i += 1) {
      this.redrawCanvas(i);
    }
    updateCanvases();
  }

  redrawCanvas(i: number) {
    if (!this.canvasEls[i]) {
      return;
    }

    const { shapes, order } = this.props;
    const ctx = this.canvasEls[i].getContext('2d');
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    order.forEach((key: string) => {
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
        {this.canvases.map(
          (canvas: React.Element<any>, i: number): React.Element<any> => (
            <div className={`ba ${i === activeCanvas ? '' : 'dn'}`} key={i}>
              {this.canvases[i]}
            </div>
          ),
        )}
        <input type="button" value="play/pause" onClick={this.handleClick} />
      </div>
    );
  }
}
