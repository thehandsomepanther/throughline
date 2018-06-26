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
  DeleteRepetitionType,
  UpdateRepeaterType,
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
  deleteRepetition: DeleteRepetitionType,
  updateRepeater: UpdateRepeaterType,
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
      deleteRepetition,
      updateRepeater,
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
              <input
                type="button"
                value="add repeater"
                onClick={() => {
                  addRepeater(key);
                }}
              />
              <input
                type="button"
                value="delete"
                onClick={() => {
                  deleteShape(key);
                }}
              />
              {repeaters[key] && (
                <div>
                  <RepeaterEditor
                    repeater={repeaters[key]}
                    updateRepeater={updateRepeater}
                    handleUpdateRepeater={(
                      i: number,
                      times: number,
                      variable: string,
                    ) => {
                      updateRepeater(key, i, times, variable);
                    }}
                    handleDeleteRepetition={(i: number) => {
                      deleteRepetition(key, i);
                    }}
                  />
                </div>
              )}
            </ShapesListItem>
          ),
        )}
      </ShapesList>
    );
  }
}
