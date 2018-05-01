// @flow
import * as React from 'react';
import type { ShapesStateType } from '../../types/shapes';
import type { PropertiesStateType, PropertyType } from '../../types/properties';

type PropsType = {
  shapes: ShapesStateType,
  properties: PropertiesStateType,
};

export default class Canvas extends React.Component<PropsType> {
  componentDidMount() {
    this.updateCanvas();
  }

  canvasEl: ?HTMLCanvasElement;

  updateCanvas() {
    if (!this.canvasEl) {
      return;
    }
    const { shapes, properties } = this.props;

    const ctx = this.canvasEl.getContext('2d');
    Object.keys(shapes).forEach((key: string) => {
      const shapeProperties: PropertyType = properties[key];
      ctx.fillRect(
        shapeProperties.xPosition,
        shapeProperties.yPosition,
        shapeProperties.width,
        shapeProperties.height,
      );
    });
  }

  render(): ?React$Element<any> {
    return (
      <div>
        <canvas
          width={600}
          height={600}
          ref={(canvasEl: any) => {
            this.canvasEl = canvasEl;
          }}
        />
      </div>
    );
  }
}
