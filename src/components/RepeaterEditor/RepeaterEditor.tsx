import * as React from 'react';
import { Dispatch } from '../../actions';
import { addChildRepeater, deleteRepeater, updateRepeater } from '../../actions/repeaters';
import { RepeatersState } from '../../types/repeaters';
import { Icon, IconButton } from '../IconButton';
import { RepeatersContainer, RepeatersInputContainer, RepeatersLayer } from './styles';

const DeleteIcon = require('../../assets/icon/Delete.svg');
const RepeatIcon = require('../../assets/icon/Repeat.svg');
const RepetitionIcon = require('../../assets/icon/Repetition.svg');

interface RepeaterEditorProps {
  repeaters: RepeatersState;
  dispatch: Dispatch;
  id: string;
  nesting?: number;
};

interface RepeaterEditorState {
  isHovered: boolean;
};

export default class RepeaterEditor extends React.Component<RepeaterEditorProps, RepeaterEditorState> {
  constructor(props: RepeaterEditorProps) {
    super(props);
    this.state = {
      isHovered: false,
    };
  }

  private handleMouseEnter = () => {
    this.setState({ isHovered: true });
  }

  private handleMouseLeave = () => {
    this.setState({ isHovered: false });
  }

  private handleVariableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const repeater = this.props.repeaters[this.props.id];
    this.props.dispatch(
      updateRepeater(this.props.id, repeater.times, e.target.value),
    );
  }

  private handleTimesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const times = Number.parseInt(e.target.value, 10);
    if (Number.isNaN(times)) {
      return;
    }

    const repeater = this.props.repeaters[this.props.id];
    this.props.dispatch(
      updateRepeater(this.props.id, Number.parseFloat(e.target.value), repeater.variable),
    );
  }

  private handleAddChildRepeaterClick = () => {
    this.props.dispatch(addChildRepeater(this.props.id));
  }

  private handleDeleteClick = () => {
    this.props.dispatch(deleteRepeater(this.props.id));
  }

  public render() {
    const { dispatch, repeaters, nesting } = this.props;
    const repeater = this.props.repeaters[this.props.id];

    return (
      <RepeatersContainer>
        <RepeatersLayer
          nesting={nesting || 0}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <RepeatersInputContainer>
            <Icon svg={RepetitionIcon} />
            <span>Repeat</span>
              <input
                value={repeater.times}
                onChange={this.handleTimesChange}
              />
            <span>times as</span>
            <input
              value={repeater.variable}
              onChange={this.handleVariableChange}
            />
          </RepeatersInputContainer>
          { this.state.isHovered && (
            <div>
              { !repeater.next &&
                <IconButton svg={RepeatIcon} onClick={this.handleAddChildRepeaterClick} />
              }
              <IconButton svg={DeleteIcon} onClick={this.handleDeleteClick} />
            </div>
          )}
        </RepeatersLayer>
        { repeater.next && (
          <RepeaterEditor
            id={repeater.next}
            dispatch={dispatch}
            repeaters={repeaters}
            nesting={(nesting || 0) + 1}
          />
        )}
      </RepeatersContainer>
    );
  }
}
