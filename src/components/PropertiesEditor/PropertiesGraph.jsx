// @flow

import React, { Component } from 'react';
import { CanvasSpace, Pt } from 'pts';

const MARGIN_VERTICAL = 20;

const percentile = (min: number, max: number, val: number): number =>
  (val - min) / (max - min);

type PropsType = {
  values: Array<number>,
};

export default class PtsChart extends Component<PropsType> {
  componentDidMount() {
    this.createChart();
  }

  componentDidUpdate() {
    if (!this.ptsCanvas) {
      return;
    }
    this.space.playOnce(0);
  }

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
      const { values } = this.props;

      const interval = this.space.size.x / (values.length + 1);
      const maxValue = Math.max(...values, 100);
      const minValue = Math.min(...values, 0);

      const getY = (val: number): number =>
        maxValue === minValue
          ? MARGIN_VERTICAL + (this.space.size.y - 2 * MARGIN_VERTICAL) / 2
          : MARGIN_VERTICAL +
            (this.space.size.y - 2 * MARGIN_VERTICAL) *
              (1 - percentile(minValue, maxValue, val));

      const points = values.map(
        (n: number, i: number): Array<any> =>
          new Pt((i + 1) * interval, getY(n)),
      );

      points.unshift(new Pt(0, getY(values[values.length - 1])));
      points.push(new Pt((values.length + 1) * interval, getY(values[0])));

      this.form.strokeOnly('#000', 2);
      this.form.line(points);

      this.form.strokeOnly('#aaa', 2, 'round');
      this.form.line(points.slice(0, 2));
      this.form.line(points.slice(points.length - 2));
    };

    this.space.add({
      animate: () => {
        if (this.form.ready) {
          this.renderChart();
        }
      },
      action: () => {
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
