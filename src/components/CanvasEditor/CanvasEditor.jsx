// @flow

import * as React from 'react';
import {
  CanvasEditorContainer,
  CanvasesContainer,
  CanvasContainer,
  TickMarkersContainer,
  TickMarker,
  ControlsContainer,
  NotificationContainer,
} from './styles';
import type { ShapesStateType } from '../../types/shapes';
import type { OrderStateType } from '../../types/order';
import type { EditorStateType } from '../../types/editor';
import type { ShapeValuesStateType } from '../../types/shapeValues';
import type {
  UpdateCanvasesType,
  ChangeActiveFrameType,
} from '../../actions/editor';
import { rgbToHex } from '../../util';

type PropsType = {
  shapes: ShapesStateType,
  order: OrderStateType,
  editor: EditorStateType,
  shapeValues: ShapeValuesStateType,
  updateCanvases: UpdateCanvasesType,
  changeActiveFrame: ChangeActiveFrameType,
};

type StateType = {
  interval: ?IntervalID,
};

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

    for (let i = 0; i < props.editor.numFrames; i += 1) {
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
      interval: null,
    };
  }

  componentWillUpdate(nextProps: PropsType) {
    const { updateCanvases } = this.props;

    if (nextProps.editor.shouldRedrawCanvases) {
      this.canvasEls.forEach((canvasEl: ?HTMLCanvasElement, frame: number) => {
        if (!canvasEl) {
          return;
        }

        const ctx = canvasEl.getContext('2d');
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        nextProps.order.forEach((key: string) => {
          const {
            fillRValues,
            fillGValues,
            fillBValues,
            posXValues,
            posYValues,
            widthValues,
            heightValues,
          } = nextProps.shapeValues[key];

          switch (nextProps.shapes[key].type) {
            case 'SHAPE_RECT':
              ctx.fillStyle = rgbToHex(
                fillRValues[frame],
                fillGValues[frame],
                fillBValues[frame],
              );
              ctx.fillRect(
                posXValues[frame],
                posYValues[frame],
                widthValues[frame],
                heightValues[frame],
              );
              break;
            default:
          }
        });
      });

      updateCanvases();
    }
  }

  setActiveCanvas = (n: number) => {
    const { changeActiveFrame, editor } = this.props;
    changeActiveFrame(n % editor.numFrames);
  };

  decrementActiveCanvas = () => {
    const { editor } = this.props;
    this.setActiveCanvas(editor.activeFrame - 1);
  };

  incrementActiveCanvas = () => {
    const { editor } = this.props;
    this.setActiveCanvas(editor.activeFrame + 1);
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

  canvases: Array<React.Element<any>>;
  canvasEls: Array<?HTMLCanvasElement>;

  render(): ?React$Element<any> {
    const { editor } = this.props;

    const tickMarkers = [];
    for (let i = 0; i < editor.numFrames; i += 1) {
      tickMarkers.push(
        <TickMarker
          key={`tickMarker-${i}`}
          index={i}
          activeCanvas={editor.activeFrame}
          onClick={() => {
            this.setActiveCanvas(i);
          }}
        />,
      );
    }

    return (
      <CanvasEditorContainer>
        <CanvasesContainer>
          {Object.keys(editor.erroneousProps).length > 0 && (
            <NotificationContainer>
              Some of your shapes have invalid props
            </NotificationContainer>
          )}
          {this.canvases.map(
            (canvas: React.Element<any>, i: number): React.Element<any> => (
              <CanvasContainer
                index={i}
                activeCanvas={editor.activeFrame}
                key={i}
              >
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
