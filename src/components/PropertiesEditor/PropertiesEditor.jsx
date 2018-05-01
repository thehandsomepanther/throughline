// @flow
import React, { Component } from 'react';
import type { ShapesStateType } from '../../types/shapes';
import type { PropertiesStateType } from '../../types/properties';

type PropsType = {
  shapes: ShapesStateType,
  properties: PropertiesStateType,
};

export default class PropertiesEditor extends Component<PropsType> {
  render() {
    return <div>editor</div>;
  }
}
