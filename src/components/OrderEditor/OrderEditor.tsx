import React, { Component } from 'react';
import RepeaterEditor from '../RepeaterEditor';
import { ShapesList, ShapesListItem } from './styles';
import { ShapesState } from '../../types/shapes';
import { OrderState } from '../../types/order';
import { EditorState } from '../../types/editor';
import { RepeatersState } from '../../types/repeaters';

const flipIndex = (index: number, length: number): number => length - 1 - index;

type PropsType = {
  shapes: ShapesState,
  order: OrderState,
  editor: EditorState,
  repeaters: RepeatersState,
  // TODO: refactor props to just pass in dispatch
  changeActiveShape: any,
  updateOrder: any,
  deleteShape: any,
  addRepeater: any,
  deleteRepetition: any,
  updateRepeater: any,
};

export default class OrderEditor extends Component<PropsType> {
  public render() {
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
        {[...order].reverse().map((key: string, i: number) => (
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
        ))}
      </ShapesList>
    );
  }
}
