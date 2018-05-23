// @flow

import React, { Component } from 'react';
import { CanvasSpace, Pt } from 'pts';
import type { ChangeActiveFrameType } from '../../actions/editor';

const MARGIN_VERTICAL = 20;

const percentile = (min: number, max: number, val: number): number =>
  (val - min) / (max - min);

type PropsType = {
  values: Array<number>,
  activeFrame: number,
  changeActiveFrame: ChangeActiveFrameType,
  updateShapeValues: ?(values: Array<number>) => void,
};

type StateType = {
  lastActiveCanvas: number,
};

export default class PropertiesGraph extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
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

      this.form.strokeOnly('#aaa', 2, 'round');
      this.form.line(points.slice(0, 2));
      this.form.line(points.slice(points.length - 2));

      this.form.line([
        new Pt((activeFrame + 1) * this.interval, 0),
        new Pt((activeFrame + 1) * this.interval, this.space.size.y),
      ]);
    };

    this.space.add({
      animate: () => {
        if (this.form.ready) {
          this.renderChart();
        }
      },
      action: (type: string) => {
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

  render(): ?React$Element<any> {
    return (
      <div>
        <canvas
          ref={(canvas: ?HTMLCanvasElement) => {
            if (canvas) {
              this.ptsCanvas = canvas;
            }
          }}
        />
      </div>
    );
  }
}
