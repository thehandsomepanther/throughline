// @flow

import React from 'react';
import { ShapesList, ShapesListItem } from './styles';
import type { ShapesStateType } from '../../types/shapes';
import type { OrderStateType } from '../../types/order';
import type { EditorStateType } from '../../types/editor';
import type { ChangeActiveShapeType } from '../../actions/editor';
import type { UpdateOrderType } from '../../actions/order';

const flipIndex = (index: number, length: number): number => length - 1 - index;

export default ({
  shapes,
  order,
  editor,
  changeActiveShape,
  updateOrder,
}: {
  shapes: ShapesStateType,
  order: OrderStateType,
  editor: EditorStateType,
  changeActiveShape: ChangeActiveShapeType,
  updateOrder: UpdateOrderType,
}): ?React$Element<any> => (
  <ShapesList>
    {[...order].reverse().map((key: string, i: number): ?React$Element<any> => (
      <ShapesListItem
        key={key}
        active={editor.activeShape === key}
        onClick={() => {
          changeActiveShape(key);
        }}
      >
        {shapes[key].name}, a {shapes[key].type}
        {i > 0 && (
          <input
            type="button"
            value="up"
            onClick={() => {
              updateOrder(
                flipIndex(i, order.length),
                flipIndex(i, order.length) + 1,
              );
            }}
          />
        )}
        {i < order.length - 1 && (
          <input
            type="button"
            value="down"
            onClick={() => {
              updateOrder(
                flipIndex(i, order.length),
                flipIndex(i, order.length) - 1,
              );
            }}
          />
        )}
      </ShapesListItem>
    ))}
  </ShapesList>
);
