// @flow

import * as React from 'react';
import {
  CanvasEditorContainer,
  CanvasesContainer,
  CanvasContainer,
  TickMarkersContainer,
  TickMarker,
  TickMarkerNumber,
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
import { paintShapes } from './painter';

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
  lastActiveCanvas: number,
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
      lastActiveCanvas: 0,
    };
  }

  componentWillUpdate(nextProps: PropsType) {
    const { updateCanvases } = this.props;

    if (
      nextProps.editor.shouldRedrawCanvases &&
      Object.getOwnPropertyNames(nextProps.editor.erroneousProps).length === 0
    ) {
      this.canvasEls.forEach((canvasEl: ?HTMLCanvasElement, frame: number) => {
        if (!canvasEl) {
          return;
        }

        const ctx = canvasEl.getContext('2d');
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        paintShapes(
          Object.keys(nextProps.shapeValues).reduce(
            (shapeValues, key: string) => ({
              ...shapeValues,
              [key]: {
                ...Object.keys(nextProps.shapeValues[key]).reduce(
                  (properties, property: string) => ({
                    ...properties,
                    [property]:
                      property === 'type' || property === 'name'
                        ? nextProps.shapeValues[key][property]
                        : nextProps.shapeValues[key][property][frame],
                  }),
                  {},
                ),
              },
            }),
            {},
          ),
          nextProps.order,
          ctx,
        );
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
    const { editor, shapes } = this.props;
    const { lastActiveCanvas } = this.state;

    const tickMarkers = [];
    for (let i = 0; i < editor.numFrames; i += 1) {
      tickMarkers.push(
        <TickMarker
          key={`tickMarker-${i}`}
          index={i}
          activeCanvas={editor.activeFrame}
          onClick={() => {
            this.setActiveCanvas(i);
            this.setState({
              lastActiveCanvas: i,
            });
          }}
          onMouseOver={() => {
            this.setActiveCanvas(i);
          }}
          onFocus={() => {}}
        >
          {(i === 0 ||
            i === editor.activeFrame ||
            i === editor.numFrames - 1) && (
            <TickMarkerNumber>{i}</TickMarkerNumber>
          )}
        </TickMarker>,
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
        <TickMarkersContainer
          onMouseEnter={() => {
            this.setState({
              lastActiveCanvas: editor.activeFrame,
            });
          }}
          onMouseLeave={() => {
            this.setActiveCanvas(lastActiveCanvas);
          }}
          onFocus={() => {}}
        >
          {tickMarkers}
        </TickMarkersContainer>
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
