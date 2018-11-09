import * as React from 'react';
import { Dispatch } from '../../actions';
import { deleteRepeater, updateRepeater } from '../../actions/repeaters';
import { RepeatersState } from '../../types/repeaters';

interface RepeaterEditorProps {
  repeaters: RepeatersState;
  dispatch: Dispatch;
  id: string;
};

export default class RepeaterEditor extends React.Component<RepeaterEditorProps> {
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

  private handleDeleteClick = () => {
    this.props.dispatch(deleteRepeater(this.props.id));
  }

  public render() {
    const { dispatch, repeaters } = this.props;
    const repeater = this.props.repeaters[this.props.id];

    return (
      <div>
        <div>
          <div>
            <label>Variable</label>
            <input
              value={repeater.variable}
              onChange={this.handleVariableChange}
            />
          </div>
          <div>
            <label>Times</label>
            <input
              value={repeater.times}
              onChange={this.handleTimesChange}
            />
          </div>
          <input
            type="button"
            value="delete repeater"
            onClick={this.handleDeleteClick}
          />
        </div>
        { repeater.next && (
          <RepeaterEditor
            id={repeater.next}
            dispatch={dispatch}
            repeaters={repeaters}
          />
        )}
      </div>
    );
  }
}
