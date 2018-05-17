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
import type { ShapesStateType } from '../../types/shapes';
import type { OrderStateType } from '../../types/order';
import type { EditorStateType } from '../../types/editor';
import type { ShapeValuesStateType } from '../../types/shapeValues';
import type {
  UpdateCanvasesType,
  AddErroneousPropType,
  ResetErroneousPropsType,
} from '../../actions/editor';
import type { SetShapeValuesType } from '../../actions/shapeValues';
import { rgbToHex } from '../../util';

type PropsType = {
  shapes: ShapesStateType,
  order: OrderStateType,
  editor: EditorStateType,
  shapeValues: ShapeValuesStateType,
  updateCanvases: UpdateCanvasesType,
  addErroneousProp: AddErroneousPropType,
  resetErroneousProps: ResetErroneousPropsType,
  setShapeValues: SetShapeValuesType,
};

type StateType = {
  activeCanvas: number,
  interval: ?IntervalID,
  shouldRedrawCanvases: boolean,
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

    this.shapePropertiesRecalcInProgress = false;
    this.debouncedRecalcPropValues = _.debounce(this.recalcPropValues, 500, {
      leading: false,
      trailing: true,
    });

    this.state = {
      activeCanvas: 0,
      interval: null,
      shouldRedrawCanvases: false,
    };
  }

  componentDidMount() {
    this.recalcPropValues();
  }

  componentWillUpdate(nextProps: PropsType, nextState: StateType) {
    if (nextState.shouldRedrawCanvases) {
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

      this.setState({ shouldRedrawCanvases: false });
    }
  }

  componentDidUpdate() {
    const { editor, updateCanvases } = this.props;
    if (editor.shouldRecalcPropValues) {
      this.debouncedRecalcPropValues();
      updateCanvases();
    }
  }

  setActiveCanvas = (n: number) => {
    const { editor } = this.props;
    this.setState({
      activeCanvas: n % editor.numFrames,
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

  recalcPropValues = () => {
    const {
      order,
      resetErroneousProps,
      updateCanvases,
      setShapeValues,
    } = this.props;

    if (this.shapePropertiesRecalcInProgress) {
      updateCanvases();
      return;
    }

    this.shapePropertiesRecalcInProgress = true;
    resetErroneousProps();

    Promise.all(
      order.map((key: string): Promise<{
        [key: string]: Array<number>,
      }> => this.recalcShapePropValues(key)),
    )
      .then((shapePropValues: Array<{ [key: string]: Array<number> }>) => {
        setShapeValues(
          shapePropValues.reduce(
            (
              prev: { [key: string]: Array<number> },
              curr: { [key: string]: Array<number> },
              i: number,
            ): { [key: string]: Array<number> } => ({
              ...prev,
              [order[i]]: curr,
            }),
            {},
          ),
        );

        this.shapePropertiesRecalcInProgress = false;
        this.setState({
          shouldRedrawCanvases: true,
        });
      })
      .catch(() => {
        this.shapePropertiesRecalcInProgress = false;
      });
  };

  recalcShapePropValues = (
    key: string,
  ): Promise<{ [key: string]: Array<number> }> =>
    new Promise(
      (
        resolve: (val: { [key: string]: Array<number> }) => void,
        reject: (reason: Error) => void,
      ) => {
        const { shapes } = this.props;
        getShapePropValues(
          shapes[key],
          this.props.editor.numFrames,
          (prop: string) => {
            this.handleDrawCanvasError(key, prop);
          },
        ).then((shapePropValues: { [key: string]: ?Array<number> }) => {
          let shouldResolve = true;

          for (let i = 0; i < Object.values(shapePropValues).length; i += 1) {
            const values = Object.values(shapePropValues)[i];
            if (values === undefined) {
              shouldResolve = false;
              break;
            }
          }

          if (shouldResolve) {
            // we know that all the values in the resolved object will be of type
            // Array<number> because of the for loop above, but Flow isn't smart
            // enough to know that
            // $FlowFixMe
            resolve(shapePropValues);
          } else {
            reject(new Error('Some shapes have invalid props'));
          }
        });
      },
    );

  canvases: Array<React.Element<any>>;
  canvasEls: Array<?HTMLCanvasElement>;
  debouncedRecalcPropValues: () => void;
  shapePropertiesRecalcInProgress: boolean;

  render(): ?React$Element<any> {
    const { editor } = this.props;
    const { activeCanvas } = this.state;

    const tickMarkers = [];
    for (let i = 0; i < editor.numFrames; i += 1) {
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
