// @flow

import React, { Component } from 'react';

type PropsType = {};
type StateType = {};

export default class NewShapeEditor extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {};
  }

  render(): ?React$Element<any> {
    return (
      <div>
        <input type="button" value="new shape" />
      </div>
    );
  }
}
