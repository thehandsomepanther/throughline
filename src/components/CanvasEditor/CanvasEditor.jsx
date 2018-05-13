// @flow

import * as React from 'react';
import {
  CanvasEditorContainer,
  CanvasesContainer,
  CanvasContainer,
  TickMarkersContainer,
  TickMarker,
  ControlsContainer,
} from './styles';
import { drawShape } from '../../util/shapes';
import type { ShapesStateType, ShapeType } from '../../types/shapes';
import type { OrderStateType } from '../../types/order';
import type { EditorStateType } from '../../types/editor';
import type {
  UpdateCanvasesActionType,
  AddErroneousPropActionType,
  ResetErroneousPropsActionType,
} from '../../actions/editor';

type PropsType = {
  shapes: ShapesStateType,
  order: OrderStateType,
  editor: EditorStateType,
  updateCanvases: () => UpdateCanvasesActionType,
  addErroneousProp: (shape: string, prop: string) => AddErroneousPropActionType,
  resetErroneousProps: () => ResetErroneousPropsActionType,
};

type StateType = {
  activeCanvas: number,
  interval: ?IntervalID,
};

const NUM_FRAMES = 60;
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;

export default class CanvasEditor extends React.Component<
  PropsType,
  StateType,
> {
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

  componentDidUpdate() {
    const { editor, updateCanvases } = this.props;
    if (editor.shouldUpdateCanvases) {
      this.redrawCanvases();
      updateCanvases();
    }
  }

  setActiveCanvas = (n: number) => {
    this.setState({
      activeCanvas: n % NUM_FRAMES,
    });
  };

  decrementActiveCanvas = () => {
    const { activeCanvas } = this.state;
    this.setActiveCanvas(activeCanvas - 1);
  };

  incrementActiveCanvas = () => {
    const { activeCanvas } = this.state;
    this.setActiveCanvas(activeCanvas + 1);
  };

  handleTogglePlayClick = () => {
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

  handleDrawCanvasError = (shape: string, prop: string) => {
    const { addErroneousProp } = this.props;
    console.log(shape, prop);
    addErroneousProp(shape, prop);
  };

  redrawCanvases = () => {
    // const { resetErroneousProps } = this.props;
    // resetErroneousProps();
    for (let i = 0; i < this.canvasEls.length; i += 1) {
      this.redrawCanvas(i);
    }
  };

  redrawCanvas = (i: number) => {
    if (!this.canvasEls[i]) {
      return;
    }

    const { shapes, order } = this.props;
    const ctx = this.canvasEls[i].getContext('2d');
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    order.forEach((key: string) => {
      drawShape(shapes[key], ctx, i, (prop: string) => {
        this.handleDrawCanvasError(key, prop);
      });
    });
  };

  canvases: Array<React.Element<any>>;
  canvasEls: Array<?HTMLCanvasElement>;

  render(): ?React$Element<any> {
    const { editor } = this.props;
    const { activeCanvas } = this.state;

    const tickMarkers = [];
    for (let i = 0; i < NUM_FRAMES; i += 1) {
      tickMarkers.push(
        <TickMarker
          key={`tickMarker-${i}`}
          index={i}
          activeCanvas={activeCanvas}
          onClick={() => {
            this.setActiveCanvas(i);
          }}
        />,
      );
    }

    return (
      <CanvasEditorContainer>
        <CanvasesContainer>
          {this.canvases.map(
            (canvas: React.Element<any>, i: number): React.Element<any> => (
              <CanvasContainer index={i} activeCanvas={activeCanvas} key={i}>
                {this.canvases[i]}
              </CanvasContainer>
            ),
          )}
        </CanvasesContainer>
        <TickMarkersContainer>{tickMarkers}</TickMarkersContainer>
        <ControlsContainer>
          <input
            type="button"
            value="previous frame"
            onClick={this.decrementActiveCanvas}
          />
          <input
            type="button"
            value="play/pause"
            onClick={this.handleTogglePlayClick}
          />
          <input
            type="button"
            value="next frame"
            onClick={this.incrementActiveCanvas}
          />
        </ControlsContainer>
      </CanvasEditorContainer>
    );
  }
}
