// @flow

import * as React from 'react';
import _ from 'lodash';
import {
  CanvasEditorContainer,
  CanvasesContainer,
  CanvasContainer,
  TickMarkersContainer,
  TickMarker,
  ControlsContainer,
  NotificationContainer,
} from './styles';
import { getShapePropValues } from '../../util/shapes';
import type { ShapesStateType, ShapeType } from '../../types/shapes';
import type { OrderStateType } from '../../types/order';
import type { EditorStateType } from '../../types/editor';
import type {
  UpdateCanvasesActionType,
  AddErroneousPropActionType,
  ResetErroneousPropsActionType,
} from '../../actions/editor';
import { rgbToHex } from '../../util';

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

    this.canvasesRedrawInProgress = false;
    this.debouncedRedrawCanvases = _.debounce(this.redrawCanvases, 500, {
      leading: false,
      trailing: true,
    });

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
      this.debouncedRedrawCanvases();
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
    addErroneousProp(shape, prop);
  };

  redrawCanvases = () => {
    const { resetErroneousProps, updateCanvases, order, shapes } = this.props;

    if (this.canvasesRedrawInProgress) {
      updateCanvases();
      return;
    }
    this.canvasesRedrawInProgress = true;

    resetErroneousProps();
    const promises = order.map((key: string): Promise<{
      [key: string]: Array<number>,
    }> => this.recalcShapePropValues(key));

    Promise.all(promises).then(
      (shapePropValues: Array<{ [key: string]: Array<number> }>) => {
        this.canvasEls.forEach(
          (canvasEl: ?HTMLCanvasElement, frame: number) => {
            if (!canvasEl) {
              return;
            }

            const ctx = canvasEl.getContext('2d');
            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            order.forEach((key: string, i: number) => {
              const {
                fillRValues,
                fillGValues,
                fillBValues,
                posXValues,
                posYValues,
                widthValues,
                heightValues,
              } = shapePropValues[i];

              switch (shapes[key].type) {
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
          },
        );

        this.canvasesRedrawInProgress = false;
      },
    );
  };

  recalcShapePropValues = (
    key: string,
  ): Promise<{ [key: string]: Array<number> }> =>
    new Promise((resolve, reject) => {
      const { shapes } = this.props;
      getShapePropValues(shapes[key], NUM_FRAMES, (prop: string) => {
        this.handleDrawCanvasError(key, prop);
      }).then((shapePropValues: { [key: string]: Array<number> }) => {
        resolve(shapePropValues);
      });
    });

  canvases: Array<React.Element<any>>;
  canvasEls: Array<?HTMLCanvasElement>;
  debouncedRedrawCanvases: () => void;
  canvasesRedrawInProgress: boolean;

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
          {Object.keys(editor.erroneousProps).length > 0 && (
            <NotificationContainer>
              Some of your shapes have invalid props
            </NotificationContainer>
          )}
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
