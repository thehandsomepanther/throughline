import * as React from 'react';
import { Dispatch } from '../../actions';
import { changeActiveShape } from '../../actions/editor';
import { addRepeater } from '../../actions/repeaters';
import { deleteShape } from '../../actions/shapes';
import { SidebarHeader } from '../../styles/components/SidebarHeader';
import { EditorState } from '../../types/editor';
import { OrderState } from '../../types/order';
import { Repeater, RepeatersState } from '../../types/repeaters';
import { Shape, ShapesState } from '../../types/shapes';
import RepeaterEditor from '../RepeaterEditor';
import { ShapesList, ShapesListItem } from './styles';

// const flipIndex = (index: number, length: number): number => length - 1 - index;

interface ShapeLayerProps {
  shape: Shape;
  repetition?: Repeater;
  shapeID: string;
  active: boolean;
  dispatch: Dispatch;
};

class ShapeLayer extends React.PureComponent<ShapeLayerProps> {
  private handleClick = () => {
    this.props.dispatch(changeActiveShape(this.props.shapeID));
  }

  private handleRepeatButtonClick = () => {
    this.props.dispatch(addRepeater(this.props.shapeID));
  }

  private handleDeleteButtonClick = () => {
    this.props.dispatch(deleteShape(this.props.shapeID));
  }

  public render() {
    const { shape, repetition, shapeID, active } = this.props

    return (
      <ShapesListItem active={active} onClick={this.handleClick}>
        {shape.name}, a {shape.type}
        <input type="button" value="add repeater" onClick={this.handleRepeatButtonClick} />
        <input type="button" value="delete" onClick={this.handleDeleteButtonClick} />
        {repetition && (
          <div>
            <RepeaterEditor
              repeater={repetition}
              dispatch={this.props.dispatch}
              shapeID={shapeID}
            />
          </div>
        )}
      </ShapesListItem>
    );
  }
}

interface OrderEditorProps {
  shapes: ShapesState;
  order: OrderState;
  editor: EditorState;
  repeaters: RepeatersState;
  dispatch: Dispatch;
};

export default class OrderEditor extends React.Component<OrderEditorProps> {
  public render() {
    const {
      shapes,
      order,
      editor,
      repeaters,
      dispatch,
    } = this.props;

    return (
      <div>
        <SidebarHeader>Layers</SidebarHeader>
        <ShapesList>
          {[...order].reverse().map((shapeID: string) => (
            <ShapeLayer
              shape={shapes[shapeID]}
              repetition={repeaters[shapeID]}
              shapeID={shapeID}
              active={editor.activeShape === shapeID}
              dispatch={dispatch}
            />
          ))}
        </ShapesList>
      </div>
    );
  }
}
