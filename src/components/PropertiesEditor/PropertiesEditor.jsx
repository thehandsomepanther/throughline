// @flow
import React, { Component } from 'react';
import type { ShapesState } from '../../types/shapes';
import type { PropertiesState } from '../../types/properties';

type Props = {
  shapes: ShapesState,
  properties: PropertiesState,
};

export default class PropertiesEditor extends Component<Props> {
  render() {
    return <div>editor</div>;
  }
}
