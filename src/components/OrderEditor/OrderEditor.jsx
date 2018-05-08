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
}: {
  shapes: ShapesStateType,
  order: OrderStateType,
  editor: EditorStateType,
  changeActiveShape: (shape: string) => UpdateCanvasesActionType,
}): ?React$Element<any> => (
  <ShapesList>
    {[...order].reverse().map((key: string): ?React$Element<any> => (
      <ShapesListItem
        key={key}
        active={editor.activeShape === key}
        onClick={() => {
          changeActiveShape(key);
        }}
      >
        {shapes[key].name}, a {shapes[key].type}
      </ShapesListItem>
    ))}
  </ShapesList>
);
