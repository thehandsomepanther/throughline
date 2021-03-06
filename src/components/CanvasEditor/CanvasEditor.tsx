import * as React from 'react';
import { Dispatch } from '../../actions';
import { changeActiveFrame, resetRedrawCanvases } from '../../actions/editor';
import { EditorState } from '../../types/editor';
import { OrderState } from '../../types/order';
import { RepeatersState } from '../../types/repeaters';
import { ShapesState } from '../../types/shapes';
import { IconButton } from '../IconButton';
import { paintShapesAtFrame } from './painter';
import {
  CanvasContainer,
  CanvasEditorContainer,
  CanvasesContainer,
  ControlsContainer,
  DummyCanvasContainer,
  NotificationContainer,
  TickMarker,
  TickMarkerNumber,
  TickMarkersContainer,
} from './styles';

const PlayIcon = require('../../icons/Play.svg');
const PauseIcon = require('../../icons/Pause.svg');
const SkipIcon = require('../../icons/Skip.svg');

interface CanvasEditorProps {
  shapes: ShapesState;
  order: OrderState;
  editor: EditorState;
  repeaters: RepeatersState;
  dispatch: Dispatch;
};

interface CanvasEditorState {
  interval: number | null;
  lastActiveCanvas: number;
};

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;

export default class CanvasEditor extends React.Component<CanvasEditorProps, CanvasEditorState> {
  private imageDataFrames: ImageData[];
  private canvasEl: HTMLCanvasElement | null = null;
  private dummyCanvasEl: HTMLCanvasElement | null = null;

  constructor(props: CanvasEditorProps) {
    super(props);
    this.imageDataFrames = [];
    this.state = {
      interval: null,
      lastActiveCanvas: 0,
    };
  }

  public componentWillReceiveProps(nextProps: CanvasEditorProps) {
    const { repeaters, editor, shapes, order } = nextProps;

    if (
      nextProps.editor.shouldRedrawFrames &&
      Object.getOwnPropertyNames(nextProps.editor.erroneousProps).length === 0 &&
      this.dummyCanvasEl
    ) {
      this.imageDataFrames = [];
      for (let i = 0; i < editor.numFrames; i++) {
        const ctx = this.dummyCanvasEl.getContext('2d');
        if (!ctx) {
          continue;
        }

        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        paintShapesAtFrame(ctx, shapes, order, repeaters, i);
        this.imageDataFrames.push(ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT));
      }

      if (this.canvasEl) {
        const ctx = this.canvasEl.getContext('2d');
        if (ctx) {
          ctx.putImageData(this.imageDataFrames[editor.activeFrame], 0, 0);
        }
      }

      this.props.dispatch(resetRedrawCanvases());
    }

    if (editor.activeFrame !== this.props.editor.activeFrame && this.canvasEl) {
      const ctx = this.canvasEl.getContext('2d');
      if (ctx) {
        ctx.putImageData(this.imageDataFrames[editor.activeFrame], 0, 0);
      }
    }
  }

  private handleTickContainerMouseEnter = () => {
    this.setState({ lastActiveCanvas: this.props.editor.activeFrame });
  }

  private handleTickContainerMouseLeave = () => {
    this.setActiveCanvas(this.state.lastActiveCanvas);
  }

  private setActiveCanvas = (n: number) => {
    const { editor, dispatch } = this.props;
    dispatch(changeActiveFrame(n % editor.numFrames));
  };

  private decrementActiveCanvas = () => {
    const { editor } = this.props;
    this.setActiveCanvas(editor.activeFrame - 1);
  };

  private incrementActiveCanvas = () => {
    const { editor } = this.props;
    this.setActiveCanvas(editor.activeFrame + 1);
  };

  private handleTogglePlayClick = () => {
    const { interval } = this.state;
    if (interval !== null) {
      clearInterval(interval);
      this.setState({ interval: null });
    } else {
      const newInterval = window.setInterval(this.incrementActiveCanvas, 16);
      this.setState({ interval: newInterval });
    }
  };

  public render() {
    const { editor } = this.props;

    const tickMarkers = [];
    for (let i = 0; i < editor.numFrames; i += 1) {
      tickMarkers.push(
        <TickMarker
          key={`tickMarker-${i}`}
          active={i === editor.activeFrame}
          onClick={() => {
            this.setActiveCanvas(i);
            this.setState({
              lastActiveCanvas: i,
            });
          }}
          onMouseOver={() => {
            this.setActiveCanvas(i);
          }}
        >
          {(i === 0 ||
            i === editor.activeFrame ||
            i === editor.numFrames - 1) && (
              <TickMarkerNumber active={i === editor.activeFrame}>{(i === 0 ? 'Frame ' : '') + i}</TickMarkerNumber>
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
          <CanvasContainer>
            <canvas
              ref={(el: HTMLCanvasElement | null) => {
                this.canvasEl = el;
              }}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
            />
          </CanvasContainer>
          <DummyCanvasContainer>
            <canvas
              ref={(el: HTMLCanvasElement | null) => {
                this.dummyCanvasEl = el;
              }}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
            />
          </DummyCanvasContainer>
        </CanvasesContainer>
        <TickMarkersContainer
          onMouseEnter={this.handleTickContainerMouseEnter}
          onMouseLeave={this.handleTickContainerMouseLeave}
        >
          {tickMarkers}
        </TickMarkersContainer>
        <ControlsContainer>
          <IconButton
            svg={SkipIcon}
            onClick={this.decrementActiveCanvas}
            styles={`transform: rotate(180deg);`}
          />
          <IconButton
            svg={this.state.interval ? PauseIcon : PlayIcon}
            onClick={this.handleTogglePlayClick}
          />
          <IconButton
            svg={SkipIcon}
            onClick={this.incrementActiveCanvas}
          />
        </ControlsContainer>
      </CanvasEditorContainer>
    );
  }
}
