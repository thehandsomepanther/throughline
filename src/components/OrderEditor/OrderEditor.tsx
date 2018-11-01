import * as React from 'react';
import RepeaterEditor from '../RepeaterEditor';
import { ShapesList, ShapesListItem } from './styles';
import { ShapesState } from '../../types/shapes';
import { OrderState } from '../../types/order';
import { EditorState } from '../../types/editor';
import { RepeatersState } from '../../types/repeaters';
import { Dispatch } from '../../actions';
import { changeActiveShape } from '../../actions/editor';
import { updateOrder } from '../../actions/order';
import { deleteShape } from '../../actions/shapes';
import { addRepeater } from '../../actions/repeaters';

const flipIndex = (index: number, length: number): number => length - 1 - index;

type OrderEditorProps = {
  shapes: ShapesState,
  order: OrderState,
  editor: EditorState,
  repeaters: RepeatersState,
  dispatch: Dispatch,
};

export default class OrderEditor extends React.Component<OrderEditorProps> {
  public render() {
    const {
      shapes,
      order,
      editor,
      repeaters,
    } = this.props;

    return (
      <ShapesList>
        {[...order].reverse().map((key: string, i: number) => (
          <ShapesListItem
            key={key}
            active={editor.activeShape === key}
            onClick={() => {
              this.props.dispatch(changeActiveShape(key));
            }}
          >
            {shapes[key].name}, a {shapes[key].type}
            {i > 0 && (
              <input
                type="button"
                value="up"
                onClick={() => {
                  this.props.dispatch(updateOrder(
                    flipIndex(i, order.length),
                    flipIndex(i, order.length) + 1,
                  ));
                }}
              />
            )}
            {i < order.length - 1 && (
              <input
                type="button"
                value="down"
                onClick={() => {
                  this.props.dispatch(updateOrder(
                    flipIndex(i, order.length),
                    flipIndex(i, order.length) - 1,
                  ));
                }}
              />
            )}
            <input
              type="button"
              value="add repeater"
              onClick={() => {
                this.props.dispatch(addRepeater(key));
              }}
            />
            <input
              type="button"
              value="delete"
              onClick={() => {
                this.props.dispatch(deleteShape(key));
              }}
            />
            {repeaters[key] && (
              <div>
                <RepeaterEditor
                  repeater={repeaters[key]}
                  dispatch={this.props.dispatch}
                  key={key}
                />
              </div>
            )}
          </ShapesListItem>
        ))}
      </ShapesList>
    );
  }
}
