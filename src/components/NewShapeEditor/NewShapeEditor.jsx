// @flow

import React, { Component } from 'react';
import { shapeTypeToProperties } from '../../types/shapes';
import type { AddNewShapeType } from '../../actions/shapes';

type PropsType = {
  addNewShape: AddNewShapeType,
};
type StateType = {
  shouldShowNewShapeInfoForm: boolean,
  newShapeType: string,
  newShapeName: string,
};

const initialState = {
  shouldShowNewShapeInfoForm: false,
  newShapeType: Object.keys(shapeTypeToProperties)[0],
  newShapeName: '',
};

export default class NewShapeEditor extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = initialState;
  }

  handleNewShapeClick = () => {
    this.setState({ shouldShowNewShapeInfoForm: true });
  };

  handleNewShapeTypeChange = (value: string) => {
    this.setState({ newShapeType: value });
  };

  handleNewShapeNameChange = (value: string) => {
    this.setState({ newShapeName: value });
  };

  handleNewShapeInfoFormSubmit = (e) => {
    const { addNewShape } = this.props;
    const { newShapeName, newShapeType } = this.state;
    e.preventDefault();
    addNewShape(newShapeType, newShapeName);
    this.setState({ ...initialState });
  };

  render(): ?React$Element<any> {
    const {
      shouldShowNewShapeInfoForm,
      newShapeName,
      newShapeType,
    } = this.state;

    return (
      <div>
        {shouldShowNewShapeInfoForm ? (
          <form onSubmit={this.handleNewShapeInfoFormSubmit}>
            <select
              value={newShapeType}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                this.handleNewShapeTypeChange(e.target.value);
              }}
            >
              {Object.keys(shapeTypeToProperties).map(
                (shapeType: string): ?React$Element<any> => (
                  <option value={shapeType} key={shapeType}>
                    {shapeType}
                  </option>
                ),
              )}
            </select>
            <input
              type="text"
              value={newShapeName}
              placeholder="shape name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                this.handleNewShapeNameChange(e.target.value);
              }}
            />
            <input
              type="submit"
              value="create shape"
              disabled={newShapeName.length ? '' : 'disabled'}
            />
          </form>
        ) : (
          <input
            type="button"
            value="new shape"
            onClick={this.handleNewShapeClick}
          />
        )}
      </div>
    );
  }
}
