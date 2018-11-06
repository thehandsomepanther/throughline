import * as React from 'react';
import { Dispatch } from '../../actions';
import { deleteRepetition, updateRepeater } from '../../actions/repeaters';
import { Repeater, Repetition } from '../../types/repeaters';

interface RepeaterEditorProps {
  repeater: Repeater;
  dispatch: Dispatch;
  shapeID: string;
}

export default class RepeaterEditor extends React.Component<RepeaterEditorProps> {
  public render() {
    const { repeater, shapeID } = this.props;

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
                      updateRepeater(shapeID, i, repetition.times, e.target.value),
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
                        shapeID,
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
                  this.props.dispatch(deleteRepetition(shapeID, i));
                }}
              />
            </div>
          ))}
      </div>
    );
  }
}
