// @flow
import * as React from 'react';
import type { ShapesStateType } from '../../types/shapes';
import type { PropertiesStateType, PropertyType } from '../../types/properties';
import type { OrderStateType } from '../../types/order';

type PropsType = {
  shapes: ShapesStateType,
  properties: PropertiesStateType,
  order: OrderStateType,
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
    const { shapes, properties, order } = this.props;
    const ctx = this.canvasEl.getContext('2d');

    order.forEach((key: string) => {
      let shapeProperties: PropertyType;
      switch (shapes[key]) {
        case 'SHAPE_RECT':
          shapeProperties = properties[key];
          ctx.fillRect(
            shapeProperties.xPosition,
            shapeProperties.yPosition,
            shapeProperties.width,
            shapeProperties.height,
          );
          break;
        default:
      }
    });
  }

  render(): ?React$Element<any> {
    return (
      <div>
        <canvas
          width={600}
          height={600}
          ref={(canvasEl: ?HTMLCanvasElement) => {
            this.canvasEl = canvasEl;
          }}
        />
      </div>
    );
  }
}
