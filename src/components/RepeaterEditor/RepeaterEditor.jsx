// @flow

import React, { Component } from 'react';
import type { RepeaterType } from '../../types/repeaters';

type PropsType = {
  repeater: RepeaterType,
};

export default class RepeaterEditor extends Component<PropsType> {
  render(): ?React$Element<any> {
    const { repeater } = this.props;

    return (
      <div>
        {Object.keys(repeater).map(
          (property: string): ?React$Element<any> => (
            <div>
              <label>{property}</label>
              <input value={repeater[property]} />
            </div>
          ),
        )}
      </div>
    );
  }
}
