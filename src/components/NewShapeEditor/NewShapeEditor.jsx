// @flow

import React, { Component } from 'react';
import type { AddNewShapeType } from '../../actions/shapes';

type PropsType = {
  addNewShape: AddNewShapeType,
};
type StateType = {};

export default class NewShapeEditor extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {};
  }

  handleNewShapeClick = () => {
    const { addNewShape } = this.props;
    addNewShape('SHAPE_RECT', 'a');
  };

  render(): ?React$Element<any> {
    return (
      <div>
        <input
          type="button"
          value="new shape"
          onClick={this.handleNewShapeClick}
        />
      </div>
    );
  }
}
