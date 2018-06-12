// @flow

import React, { Component } from 'react';
import RepeaterEditor from '../RepeaterEditor';
import { ShapesList, ShapesListItem } from './styles';
import type { ShapesStateType } from '../../types/shapes';
import type { OrderStateType } from '../../types/order';
import type { EditorStateType } from '../../types/editor';
import type { RepeatersStateType } from '../../types/repeaters';
import type { ChangeActiveShapeType } from '../../actions/editor';
import type { UpdateOrderType } from '../../actions/order';
import type { DeleteShapeType } from '../../actions/shapes';
import type {
  AddRepeaterType,
  DeleteRepeaterType,
} from '../../actions/repeaters';

const flipIndex = (index: number, length: number): number => length - 1 - index;

type PropsType = {
  shapes: ShapesStateType,
  order: OrderStateType,
  editor: EditorStateType,
  repeaters: RepeatersStateType,
  changeActiveShape: ChangeActiveShapeType,
  updateOrder: UpdateOrderType,
  deleteShape: DeleteShapeType,
  addRepeater: AddRepeaterType,
  deleteRepeater: DeleteRepeaterType,
};

export default class OrderEditor extends Component<PropsType> {
  render(): ?React$Element<any> {
    const {
      shapes,
      order,
      editor,
      repeaters,
      changeActiveShape,
      updateOrder,
      deleteShape,
      addRepeater,
      deleteRepeater,
    } = this.props;

    return (
      <ShapesList>
        {[...order].reverse().map(
          (key: string, i: number): ?React$Element<any> => (
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
              {!repeaters[key] && (
                <input
                  type="button"
                  value="add repeater"
                  onClick={() => {
                    addRepeater(key, shapes[key].type);
                  }}
                />
              )}
              <input
                type="button"
                value="delete"
                onClick={() => {
                  deleteShape(key);
                }}
              />
              {repeaters[key] && (
                <div>
                  <input
                    type="button"
                    value="delete repeater"
                    onClick={() => {
                      deleteRepeater(key);
                    }}
                  />
                  <RepeaterEditor repeater={repeaters[key]} />
                </div>
              )}
            </ShapesListItem>
          ),
        )}
      </ShapesList>
    );
  }
}
