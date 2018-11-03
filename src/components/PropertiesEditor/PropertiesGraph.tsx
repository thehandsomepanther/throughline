import { CanvasSpace, Group, Line, Pt, Rectangle } from 'pts';
import * as React from 'react';
import { Dispatch } from '../../actions';
import { changeActiveFrame } from '../../actions/editor';
import { updateShapeValues } from '../../actions/shapes';

const MARGIN_VERTICAL = 40;

const percentile = (min: number, max: number, val: number): number =>
  (val - min) / (max - min);

interface PropertiesGraphProps {
  values: number[];
  activeFrame: number;
  shapeID: string;
  shapeProperty: string;
  dispatch: Dispatch;
}

interface PropertiesGraphState {
  lastActiveCanvas: number;
}

export default class PropertiesGraph extends React.Component<PropertiesGraphProps, PropertiesGraphState> {

  get interval(): number {
    return this.space.size.x / (this.props.values.length + 1);
  }

  private space: any;
  private form: any;
  private ptsCanvas: HTMLCanvasElement;
  private renderChart: () => void;
  constructor(props: PropertiesGraphProps) {
    super(props);
    this.state = {
      lastActiveCanvas: 0
    };
  }

  public componentDidMount() {
    if (!this.ptsCanvas) {
      return;
    }
    this.createChart();
  }

  public componentDidUpdate() {
    this.space.playOnce(0);
  }


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

  private getSpacePointFromGraphPoint = (x: number, y: number): number[] => {
    const { values } = this.props;
    const maxValue = Math.max(...values) + MARGIN_VERTICAL;
    const minValue = Math.min(...values) - MARGIN_VERTICAL;

    return [
      (x + 1) * this.interval,
      this.space.size.y * (1 - percentile(minValue, maxValue, y))
    ];
  };

  private getGraphPointFromSpacePoint = (x: number, y: number): number[] => {
    const { values } = this.props;

    const p = 1 - y / this.space.size.y;
    const maxValue = Math.max(...values) + MARGIN_VERTICAL;
    const minValue = Math.min(...values) - MARGIN_VERTICAL;

    return [(x + 1) * this.interval, (maxValue - minValue) * p + minValue];
  };

  private getGraphValAtSpaceX = (x: number): number[] => {
    const { values } = this.props;
    const i = Math.floor(x / this.interval - 1);

    return [i, values[i]];
  };

  private createChart = () => {
    if (!this.ptsCanvas) {
      return;
    }

    this.space = new CanvasSpace(this.ptsCanvas).setup({
      resize: true,
      retina: true
    });
    this.form = this.space.getForm();

    this.renderChart = () => {
      const { values, activeFrame } = this.props;

      const points = values.map(
        (n: number, i: number): any =>
          new Pt(...this.getSpacePointFromGraphPoint(i, n))
      );

      points.unshift(
        new Pt(
          ...this.getSpacePointFromGraphPoint(-1, values[values.length - 1])
        )
      );
      points.push(
        new Pt(...this.getSpacePointFromGraphPoint(values.length, values[0]))
      );

      this.form.strokeOnly('#000', 2);
      this.form.line(points);

      this.form.strokeOnly('#aaa', 2);
      this.form.line(points.slice(0, 2));
      this.form.line(points.slice(points.length - 2));

      this.form.line([
        new Pt((activeFrame + 1) * this.interval, 0),
        new Pt((activeFrame + 1) * this.interval, this.space.size.y)
      ]);

      const rect = Rectangle.fromCenter(
        new Pt((activeFrame + 1) * this.interval + 16, this.space.size.y - 16),
        20
      );
      this.form.font(12).textBox(rect, activeFrame, 'bottom', '', true);

      // this code to draw the intersections between the y axis and the line is
      // super intense. find a better way to do this in the future
      const yAxisLine = new Group(
        new Pt(0, this.space.pointer.y),
        new Pt(this.space.size.x, this.space.pointer.y)
      );

      for (let i = 0; i < points.length - 1; i += 1) {
        const valuesLine = new Group(points[i], points[i + 1]);
        const intersect = Line.intersectLine2D(yAxisLine, valuesLine);

        this.form
          .stroke('#09f', 2)
          .line(yAxisLine)
          .point(intersect);

        if (intersect) {
          const [x, y] = this.getGraphValAtSpaceX(intersect[0]);

          if (x >= 0 && x < values.length) {
            const textRect = Rectangle.fromCenter(
              new Pt(intersect[0] + 16, intersect[1] - 16),
              [40, 12]
            );
            this.form.font(12).textBox(textRect, `${y}`, 'bottom', '');
          }
        }
      }
    };

    this.space.add({
      animate: () => {
        if (this.form.ready) {
          this.renderChart();
        }
      },
      action: (type: string) => {
        if (!this.form.ready) {
          return;
        }

        const {
          activeFrame,
          values,
          dispatch,
          shapeProperty,
          shapeID
        } = this.props;
        const { lastActiveCanvas } = this.state;
        const frame = Math.floor(this.space.pointer.x / this.interval);
        let graphY;

        switch (type) {
          case 'over':
            this.setState({ lastActiveCanvas: activeFrame });
            break;
          case 'out':
            changeActiveFrame(lastActiveCanvas);
            break;
          case 'move':
            if (frame >= 0 && frame < values.length) {
              changeActiveFrame(
                Math.floor(this.space.pointer.x / this.interval)
              );
            }
            break;
          case 'down':
          case 'drag':
            if (frame >= 0 && frame < values.length) {
              [, graphY] = this.getGraphPointFromSpacePoint(
                this.space.pointer.x,
                this.space.pointer.y
              );
              values[frame] = graphY;
              // TODO: shapeTypeToProperties needs better typing, or else we'll have
              // to keep patching type mischecks like this one
              dispatch(updateShapeValues(shapeID, shapeProperty as any, values));
            }
            break;
          default:
        }

        this.space.clear();
        this.renderChart();
      },
      resize: () => {
        if (this.form.ready) {
          this.space.clear();
          this.renderChart();
        }
      }
    });

    this.space.bindMouse().bindTouch();
    this.space.playOnce(0);
  };
}
