import { CanvasForm, CanvasSpace, Pt, Rectangle } from 'pts';
import * as React from 'react';
import { Dispatch } from '../../actions';
import { changeActiveFrame } from '../../actions/editor';
import { updateCustom, updateUsing } from '../../actions/shapes';
import { COLOR_BLACK, COLOR_BLUE, COLOR_GREY, COLOR_RED } from '../../styles';
import { Using } from '../../types/formulas';
import { FormulaValues } from '../../types/shapes';

const MARGIN_VERTICAL = 40;

const percentile = (min: number, max: number, val: number): number =>
  (val - min) / (max - min);

interface PropertiesGraphProps {
  values: FormulaValues;
  activeFrame: number;
  shapeID: string;
  shapeProperty: string;
  dispatch: Dispatch;
  using: Using;
};

interface PropertiesGraphState {
  lastActiveFrame: number;
};

export class PropertiesGraph extends React.Component<PropertiesGraphProps, PropertiesGraphState> {
  constructor(props: PropertiesGraphProps) {
    super(props);
    this.state = {
      lastActiveFrame: 0
    };
  }

  private space: CanvasSpace | null = null;
  private form: CanvasForm | null = null;
  private ptsCanvas: HTMLCanvasElement;
  private renderChart: () => void;

  get interval(): number {
    if (!this.space) {
      return -1;
    }

    return this.space.size.x / (this.props.values.length + 1);
  }

  public componentDidMount() {
    this.createChart();
  }

  public componentWillReceiveProps(nextProps: PropertiesGraphProps) {
    if (nextProps.using !== this.props.using) {
      this.createChart();
    }
  }

  public componentDidUpdate() {
    if (!this.space) {
      return;
    }

    this.space.playOnce(0);
  }

  private getCanvasSpacePointFromValue = (space: CanvasSpace, x: number, y: number): number[] => {
    const { values } = this.props;
    const maxValue = Math.max(...values) + MARGIN_VERTICAL;
    const minValue = Math.min(...values) - MARGIN_VERTICAL;

    return [
      (x + 1) * this.interval,
      space.size.y * (1 - percentile(minValue, maxValue, y))
    ];
  };

  private getValueAtCanvasSpacePoint = (space: CanvasSpace, x: number, y: number): number[] => {
    const { values } = this.props;

    const p = 1 - y / space.size.y;
    const maxValue = Math.max(...values) + MARGIN_VERTICAL;
    const minValue = Math.min(...values) - MARGIN_VERTICAL;

    return [(x + 1) * this.interval, (maxValue - minValue) * p + minValue];
  };

  private createChart = () => {
    if (!this.ptsCanvas) {
      return;
    }

    if (this.space) {
      this.space.clear();
    }

    this.space = new CanvasSpace(this.ptsCanvas).setup({
      resize: true,
      retina: true,
      bgcolor: COLOR_BLACK,
    });
    this.form = this.space.getForm();

    this.renderChart = () => {
      if (!this.space || !this.form) {
        return;
      }

      const { values, activeFrame } = this.props;
      const space = this.space;

      // Create a point on the CanvasSpace for every value
      const points = values.map(
        (n: number, i: number): Pt =>
          new Pt(...this.getCanvasSpacePointFromValue(space, i, n))
      );

      // We want our graph to "loop around," so we put a copy of the last value
      // at the front of our graph...
      points.unshift(
        new Pt(
          ...this.getCanvasSpacePointFromValue(space, -1, values[values.length - 1])
        )
      );

      // ... and a copy of the first value at the end of our graph.
      points.push(
        new Pt(...this.getCanvasSpacePointFromValue(space, values.length, values[0]))
      );

      // Draw a blue line between all the points
      this.form.strokeOnly(COLOR_BLUE, 2);
      this.form.line(points);

      // Draw a gray line for the "looping around"
      this.form.strokeOnly(COLOR_GREY, 2);
      this.form.line(points.slice(0, 2));
      this.form.line(points.slice(points.length - 2));

      // Draw a vertical line at the current active frame
      this.form.strokeOnly(COLOR_RED, 2);
      this.form.line([
        new Pt((activeFrame + 1) * this.interval, 0),
        new Pt((activeFrame + 1) * this.interval, this.space.size.y)
      ]);

      // Render a number to indicate the current active frame
      const rect = Rectangle.fromCenter(
        new Pt((activeFrame + 1) * this.interval + 16, this.space.size.y - 16),
        20
      );
      this.form.font(10).textBox(rect, `${activeFrame}`, 'bottom', '', true);
    };

    this.space.add({
      animate: () => {
        if (this.form && this.form.ready) {
          this.renderChart();
        }
      },
      action: (type: string) => {
        if (!this.form || !this.form.ready || !this.space) {
          return;
        }

        const {
          activeFrame,
          values,
          dispatch,
          shapeProperty,
          shapeID
        } = this.props;
        const { lastActiveFrame } = this.state;
        const frame = Math.floor(this.space.pointer.x / this.interval);
        let graphY;

        switch (type) {
          case 'over':
            this.setState({ lastActiveFrame: activeFrame });
            break;
          case 'out':
            dispatch(changeActiveFrame(lastActiveFrame));
            break;
          case 'move':
            if (frame >= 0 && frame < values.length) {
              dispatch(changeActiveFrame(frame));
            }
            break;
          case 'down':
          case 'drag':
            if (frame >= 0 && frame < values.length) {
              [, graphY] = this.getValueAtCanvasSpacePoint(
                this.space,
                this.space.pointer.x,
                this.space.pointer.y
              );
              values[frame] = graphY;
              dispatch(updateUsing(shapeID, shapeProperty as any, Using.Custom));
              // TODO: shapeTypeToProperties needs better typing, or else we'll have
              // to keep patching type mischecks like this one
              dispatch(updateCustom(shapeID, shapeProperty as any, values));
            }
            break;
          default:
        }

        this.space.clear();
        this.renderChart();
      },
      resize: () => {
        if (this.form && this.form.ready && this.space) {
          this.space.clear();
          this.renderChart();
        }
      }
    });

    this.space.bindMouse().bindTouch();
    this.space.playOnce(0);
  };

  public render() {
    return (
      <div>
        <canvas
          ref={(canvas: HTMLCanvasElement | null) => {
            if (canvas) {
              this.ptsCanvas = canvas;
            }
          }}
        />
      </div>
    );
  }
}
