import * as React from 'react';
import { CanvasSpace, Pt, Rectangle, Group, Line } from 'pts';

const MARGIN_VERTICAL = 40;

const percentile = (min: number, max: number, val: number): number =>
  (val - min) / (max - min);

type PropertiesGraphProps = {
  values: Array<number>,
  activeFrame: number,
  changeActiveFrame: any,
  updateShapeValues: any,
};

type PropertiesGraphState = {
  lastActiveCanvas: number,
};

export default class PropertiesGraph extends React.Component<
  PropertiesGraphProps,
  PropertiesGraphState,
> {
  constructor(props: PropertiesGraphProps) {
    super(props);
    this.state = {
      lastActiveCanvas: 0,
    };
  }

  componentDidMount() {
    if (!this.ptsCanvas) {
      return;
    }
    this.createChart();
  }

  componentDidUpdate() {
    this.space.playOnce(0);
  }

  get interval(): number {
    return this.space.size.x / (this.props.values.length + 1);
  }

  getSpacePointFromGraphPoint = (x: number, y: number): Array<number> => {
    const { values } = this.props;
    const maxValue = Math.max(...values) + MARGIN_VERTICAL;
    const minValue = Math.min(...values) - MARGIN_VERTICAL;

    return [
      (x + 1) * this.interval,
      this.space.size.y * (1 - percentile(minValue, maxValue, y)),
    ];
  };

  getGraphPointFromSpacePoint = (x: number, y: number): Array<number> => {
    const { values } = this.props;

    const p = 1 - y / this.space.size.y;
    const maxValue = Math.max(...values) + MARGIN_VERTICAL;
    const minValue = Math.min(...values) - MARGIN_VERTICAL;

    return [(x + 1) * this.interval, (maxValue - minValue) * p + minValue];
  };

  getGraphValAtSpaceX = (x: number): Array<number> => {
    const { values } = this.props;
    const i = Math.floor(x / this.interval - 1);

    return [i, values[i]];
  };

  createChart = () => {
    if (!this.ptsCanvas) {
      return;
    }

    this.space = new CanvasSpace(this.ptsCanvas).setup({
      resize: true,
      retina: true,
    });
    this.form = this.space.getForm();

    this.renderChart = () => {
      const { values, activeFrame } = this.props;

      const points = values.map(
        (n: number, i: number): any =>
          new Pt(...this.getSpacePointFromGraphPoint(i, n)),
      );

      points.unshift(
        new Pt(
          ...this.getSpacePointFromGraphPoint(-1, values[values.length - 1]),
        ),
      );
      points.push(
        new Pt(...this.getSpacePointFromGraphPoint(values.length, values[0])),
      );

      this.form.strokeOnly('#000', 2);
      this.form.line(points);

      this.form.strokeOnly('#aaa', 2);
      this.form.line(points.slice(0, 2));
      this.form.line(points.slice(points.length - 2));

      this.form.line([
        new Pt((activeFrame + 1) * this.interval, 0),
        new Pt((activeFrame + 1) * this.interval, this.space.size.y),
      ]);

      const rect = Rectangle.fromCenter(
        new Pt((activeFrame + 1) * this.interval + 16, this.space.size.y - 16),
        20,
      );
      this.form.font(12).textBox(rect, activeFrame, 'bottom', '', true);

      // this code to draw the intersections between the y axis and the line is
      // super intense. find a better way to do this in the future
      const yAxisLine = new Group(
        new Pt(0, this.space.pointer.y),
        new Pt(this.space.size.x, this.space.pointer.y),
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
              [40, 12],
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
          changeActiveFrame,
          activeFrame,
          values,
          updateShapeValues,
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
                Math.floor(this.space.pointer.x / this.interval),
              );
            }
            break;
          case 'down':
          case 'drag':
            if (frame >= 0 && frame < values.length && updateShapeValues) {
              [, graphY] = this.getGraphPointFromSpacePoint(
                this.space.pointer.x,
                this.space.pointer.y,
              );
              values[frame] = graphY;
              updateShapeValues(values);
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
      },
    });

    this.space.bindMouse().bindTouch();
    this.space.playOnce(0);
  };

  space: any;
  form: any;
  ptsCanvas: HTMLCanvasElement;
  renderChart: () => void;

  render() {
    return (
      <div>
        <canvas
          ref={(canvas?: HTMLCanvasElement) => {
            if (canvas) {
              this.ptsCanvas = canvas;
            }
          }}
        />
      </div>
    );
  }
}
