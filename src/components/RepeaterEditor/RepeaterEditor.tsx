import * as React from 'react';
import { Repeater, Repetition } from '../../types/repeaters';
import { Dispatch } from '../../actions';
import { updateRepeater, deleteRepetition } from '../../actions/repeaters';

type RepeaterEditorProps = {
  repeater: Repeater,
  dispatch: Dispatch,
  key: string,
};

export default class RepeaterEditor extends React.Component<RepeaterEditorProps> {
  public render() {
    const { repeater, key } = this.props;

    return (
      <div>
        {repeater &&
          repeater.map((repetition: Repetition, i: number) => (
            <div key={i}>
              <div>
                <label>Variable</label>
                <input
                  value={repetition.variable}
                  onChange={(e) => {
                    this.props.dispatch(
                      updateRepeater(key, i, repetition.times, e.target.value),
                    );
                  }}
                />
              </div>
              <div>
                <label>Times</label>
                <input
                  value={repetition.times}
                  onChange={(e) => {
                    this.props.dispatch(
                      updateRepeater(
                        key,
                        i,
                        Number.parseFloat(e.target.value),
                        repetition.variable,
                      ),
                    );
                  }}
                />
              </div>
              <input
                type="button"
                value="delete repeater"
                onClick={() => {
                  this.props.dispatch(deleteRepetition(key, i));
                }}
              />
            </div>
          ))}
      </div>
    );
  }
}
