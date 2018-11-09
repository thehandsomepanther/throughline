import * as React from 'react';
import { Dispatch } from '../../actions';
import { changeActiveShape } from '../../actions/editor';
import { addRootRepeater } from '../../actions/repeaters';
import { toggleShapeVisible } from '../../actions/shapes';
import { SidebarHeader } from '../../styles/components/SidebarHeader';
import { EditorState } from '../../types/editor';
import { OrderState } from '../../types/order';
import { RepeatersState } from '../../types/repeaters';
import { Shape, ShapesState } from '../../types/shapes';
import { IconButton } from '../IconButton';
import RepeaterEditor from '../RepeaterEditor';
import { Layer, LayerContainer, LayerIcons, LayerName, ShapesList } from './styles';

const HandleIcon = require('../../assets/icon/Handle.svg');
const RepeatIcon = require('../../assets/icon/Repeat.svg');
const VisibleIcon = require('../../assets/icon/Visible.svg');
const InvisibleIcon = require('../../assets/icon/Invisible.svg');

// const flipIndex = (index: number, length: number): number => length - 1 - index;

interface ShapeLayerProps {
  shape: Shape;
  repeaters: RepeatersState;
  shapeID: string;
  active: boolean;
  dispatch: Dispatch;
};

interface ShapeLayerState {
  isHovered: boolean;
};

class ShapeLayer extends React.Component<ShapeLayerProps, ShapeLayerState> {
  constructor(props: ShapeLayerProps) {
    super(props);
    this.state = {
      isHovered: false,
    };
  }

  private handleClick = () => {
    this.props.dispatch(changeActiveShape(this.props.shapeID));
  }

  private handleRepeatButtonClick = () => {
    this.props.dispatch(addRootRepeater(this.props.shapeID));
  }

  private handleToggleVisibleClick = () => {
    this.props.dispatch(toggleShapeVisible(this.props.shapeID));
  }

  private handleMouseEnter = () => {
    this.setState({ isHovered: true });
  }

  private handleMouseLeave = () => {
    this.setState({ isHovered: false });
  }

  public render() {
    const { shape, repeaters, shapeID, active } = this.props;
    return (
      <LayerContainer
        active={active}
        visible={shape.visible}
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Layer>
          <LayerName>
            <IconButton svg={HandleIcon} />
            <span>{shape.name}</span>
          </LayerName>
          <LayerIcons>
            {(this.state.isHovered && !repeaters[shapeID]) &&
              <IconButton svg={RepeatIcon} onClick={this.handleRepeatButtonClick} />
            }
            {(this.state.isHovered || !shape.visible) &&
              <IconButton
                svg={shape.visible ? VisibleIcon : InvisibleIcon}
                onClick={this.handleToggleVisibleClick}
              />
            }
          </LayerIcons>
        </Layer>
        {repeaters[shapeID] && (
          <RepeaterEditor
            repeaters={repeaters}
            dispatch={this.props.dispatch}
            id={shapeID}
          />
        )}
      </LayerContainer>
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
              repeaters={repeaters}
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
