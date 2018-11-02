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
import { ShapesState } from '../../types/shapes';
import { OrderState } from '../../types/order';
import { EditorState } from '../../types/editor';
import { RepeatersState } from '../../types/repeaters';
import { Dispatch } from '../../actions';
import { resetRedrawCanvases, changeActiveFrame } from '../../actions/editor';
import { paintShapesAtFrame } from './painter';

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

export default class CanvasEditor extends React.Component<
  CanvasEditorProps,
  CanvasEditorState
> {
  constructor(props: CanvasEditorProps) {
    super(props);
    this.frames = [];
    this.state = {
      interval: null,
      lastActiveCanvas: 0,
    };
  }

  componentWillReceiveProps(nextProps: CanvasEditorProps) {
    const { repeaters, editor, shapes, order } = nextProps;

    if (
      nextProps.editor.shouldRedrawFrames &&
      Object.getOwnPropertyNames(nextProps.editor.erroneousProps).length === 0 &&
      this.dummyCanvasEl
    ) {
      this.frames = [];
      for (let i = 0; i < editor.numFrames; i++) {
        const ctx = this.dummyCanvasEl.getContext('2d');
        if (!ctx) {
          continue;
        }

        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        paintShapesAtFrame(shapes, order, repeaters, i, ctx);
        this.frames.push(ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT));
      }

      this.props.dispatch(resetRedrawCanvases());
    }

    if (editor.activeFrame !== this.props.editor.activeFrame && this.canvasEl) {
      const ctx = this.canvasEl.getContext('2d');
      if (ctx) {
        ctx.putImageData(this.frames[editor.activeFrame], 0, 0);
      }
    }
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

  frames: Array<ImageData>;
  canvasEl: HTMLCanvasElement | null = null;
  dummyCanvasEl: HTMLCanvasElement | null = null;

  public render() {
    const { editor } = this.props;
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
          <CanvasContainer>
            <canvas ref={(el: HTMLCanvasElement | null) => {
              this.canvasEl = el;
            }} />
            <canvas ref={(el: HTMLCanvasElement | null) => {
              this.dummyCanvasEl = el;
            }} />
          </CanvasContainer>
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
