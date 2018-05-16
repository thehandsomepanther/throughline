// @flow

import React from 'react';
import { ShapesList, ShapesListItem } from './styles';
import type { ShapesStateType } from '../../types/shapes';
import type { OrderStateType } from '../../types/order';
import type { EditorStateType } from '../../types/editor';
import type { UpdateCanvasesActionType } from '../../actions/editor';

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
  changeActiveShape: (shape: string) => UpdateCanvasesActionType,
  updateOrder: () => void,
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
        {shapes[key].name}, a {shapes[key].type} at {i}
        {i > 0 && (
          <input
            type="button"
            value="up"
            onClick={() => {
              updateOrder(order.length - 1 - i, order.length - 1 - i + 1);
            }}
          />
        )}
        {i < order.length - 1 && (
          <input
            type="button"
            value="down"
            onClick={() => {
              updateOrder(order.length - 1 - i, order.length - 1 - i - 1);
            }}
          />
        )}
      </ShapesListItem>
    ))}
  </ShapesList>
);
