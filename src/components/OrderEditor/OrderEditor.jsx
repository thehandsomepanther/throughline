// @flow

import React, { Component } from 'react';
import type { ShapesStateType } from '../../types/shapes';
import type { OrderStateType } from '../../types/order';

type PropsType = {
  shapes: ShapesStateType,
  order: OrderStateType,
};

export default class OrderEditor extends Component<PropsType> {
  render() {
    const { shapes, order } = this.props;

    return (
      <ol>
        {order.map((key, i) => (
          <li key={i}>
            {key}, a {shapes[key]}
          </li>
        ))}
      </ol>
    );
  }
}
