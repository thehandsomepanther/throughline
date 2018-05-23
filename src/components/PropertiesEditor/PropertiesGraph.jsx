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
};

type StateType = {
  lastActiveCanvas: number,
};

const INITIAL_STATE = {
  lastActiveCanvas: 0,
};

export default class PropertiesGraph extends Component<PropsType, StateType> {
  componentDidMount() {
    if (!this.ptsCanvas) {
      return;
    }
    this.state = INITIAL_STATE;
    this.createChart();
  }

  componentDidUpdate() {
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
      const { values, activeFrame } = this.props;

      const interval = this.space.size.x / (values.length + 1);
      const maxValue = Math.max(...values);
      const minValue = Math.min(...values);

      const getY = (val: number): number =>
        MARGIN_VERTICAL +
        (this.space.size.y - 2 * MARGIN_VERTICAL) *
          (maxValue === minValue
            ? 1 / 2
            : 1 * (1 - percentile(minValue, maxValue, val)));

      const points = values.map(
        (n: number, i: number): any => new Pt((i + 1) * interval, getY(n)),
      );

      points.unshift(new Pt(0, getY(values[values.length - 1])));
      points.push(new Pt((values.length + 1) * interval, getY(values[0])));

      this.form.strokeOnly('#000', 2);
      this.form.line(points);

      this.form.strokeOnly('#aaa', 2, 'round');
      this.form.line(points.slice(0, 2));
      this.form.line(points.slice(points.length - 2));

      this.form.line([
        new Pt((activeFrame + 1) * interval, 0),
        new Pt((activeFrame + 1) * interval, this.space.size.y),
      ]);
    };

    this.space.add({
      animate: () => {
        if (this.form.ready) {
          this.renderChart();
        }
      },
      action: (type: string) => {
        // without this check, for some reason this.state will be set to null
        // on every PropertiesGraph except the first one interacted with
        if (!this.state) {
          this.state = INITIAL_STATE;
        }

        const { changeActiveFrame, activeFrame, values } = this.props;
        const { lastActiveCanvas } = this.state;
        const interval = this.space.size.x / (values.length + 1);
        let frame;

        switch (type) {
          case 'over':
            this.setState({ lastActiveCanvas: activeFrame });
            break;
          case 'out':
            changeActiveFrame(lastActiveCanvas);
            break;
          case 'move':
            frame = Math.floor(this.space.pointer.x / interval);
            if (frame >= 0 && frame < values.length) {
              changeActiveFrame(Math.floor(this.space.pointer.x / interval));
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
