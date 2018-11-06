import * as React from 'react';
import { Dispatch } from '../../actions';
import { changeActiveShape } from '../../actions/editor';
import { addRepeater } from '../../actions/repeaters';
import { toggleShapeVisible } from '../../actions/shapes';
import { SidebarHeader } from '../../styles/components/SidebarHeader';
import { EditorState } from '../../types/editor';
import { OrderState } from '../../types/order';
import { Repeater, RepeatersState } from '../../types/repeaters';
import { Shape, ShapesState } from '../../types/shapes';
import { IconButton } from '../IconButton';
import RepeaterEditor from '../RepeaterEditor';
import { Layer, LayerIcons, LayerName, ShapesList } from './styles';

const HandleIcon = require('../../assets/icon/Handle.svg');
const RepeatIcon = require('../../assets/icon/Repeat.svg');
const VisibleIcon = require('../../assets/icon/Visible.svg');
const InvisibleIcon = require('../../assets/icon/Invisible.svg');

// const flipIndex = (index: number, length: number): number => length - 1 - index;

interface ShapeLayerProps {
  shape: Shape;
  repetition?: Repeater;
  shapeID: string;
  active: boolean;
  dispatch: Dispatch;
};

class ShapeLayer extends React.Component<ShapeLayerProps> {
  private handleClick = () => {
    this.props.dispatch(changeActiveShape(this.props.shapeID));
  }

  private handleRepeatButtonClick = () => {
    this.props.dispatch(addRepeater(this.props.shapeID));
  }

  private handleToggleVisibleClick = () => {
    this.props.dispatch(toggleShapeVisible(this.props.shapeID));
  }

  public render() {
    const { shape, repetition, shapeID, active } = this.props;
    return (
      <Layer active={active} visible={shape.visible} onClick={this.handleClick}>
        <LayerName>
          <IconButton svg={HandleIcon} />
          <span>{shape.name}</span>
        </LayerName>
        <LayerIcons>
          <IconButton svg={RepeatIcon} onClick={this.handleRepeatButtonClick} />
          <IconButton svg={shape.visible ? VisibleIcon : InvisibleIcon} onClick={this.handleToggleVisibleClick} />
        </LayerIcons>
        {repetition && (
          <div>
            <RepeaterEditor
              repeater={repetition}
              dispatch={this.props.dispatch}
              shapeID={shapeID}
            />
          </div>
        )}
      </Layer>
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
