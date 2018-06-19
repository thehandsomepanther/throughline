// @flow

import React, { Component } from 'react';
import type { RepeaterType } from '../../types/repeaters';
import type { UpdateRepeaterType } from '../../actions/repeaters';

type PropsType = {
  repeater: RepeaterType,
  handleUpdateRepeater: (property: string, value: string | number) => {},
};

export default class RepeaterEditor extends Component<PropsType> {
  render(): ?React$Element<any> {
    const { repeater, handleUpdateRepeater } = this.props;

    return (
      <div>
        {Object.keys(repeater).map(
          (property: string): ?React$Element<any> => (
            <div key={property}>
              <label>{property}</label>
              <input
                value={repeater[property]}
                onChange={(e) => {
                  handleUpdateRepeater(property, e.target.value);
                }}
              />
            </div>
          ),
        )}
      </div>
    );
  }
}
