// @flow
import React, { Component } from "react";
import type { ShapesState } from "../../types/Shapes";
import type { PropertiesState } from "../../types/Properties";

type Props = {
  shapes: ShapesState,
  properties: PropertiesState
};

export default class Canvas extends Component<Props> {
  render() {
    const { properties } = this.props;

    return <div>editor</div>;
  }
}
