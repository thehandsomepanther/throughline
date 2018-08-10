// @flow

import React, { Component } from 'react';
import type { RepeaterType, RepetitionType } from '../../types/repeaters';

type PropsType = {
  repeater: RepeaterType,
  handleUpdateRepeater: (i: number, times: number, variable: string) => {},
  handleDeleteRepetition: (i: number) => {},
};

export default class RepeaterEditor extends Component<PropsType> {
  render(): ?React$Element<any> {
    const {
      repeater,
      handleUpdateRepeater,
      handleDeleteRepetition,
    } = this.props;

    return (
      <div>
        {repeater &&
          repeater.map((repetition: RepetitionType, i: number) => (
            <div key={i}>
              <div>
                <label>Variable</label>
                <input
                  value={repetition.variable}
                  onChange={(e) => {
                    handleUpdateRepeater(i, repetition.times, e.target.value);
                  }}
                />
              </div>
              <div>
                <label>Times</label>
                <input
                  value={repetition.times}
                  onChange={(e) => {
                    handleUpdateRepeater(
                      i,
                      Number.parseFloat(e.target.value),
                      repetition.variable,
                    );
                  }}
                />
              </div>
              <input
                type="button"
                value="delete repeater"
                onClick={() => {
                  handleDeleteRepetition(i);
                }}
              />
            </div>
          ))}
      </div>
    );
  }
}
