// @flow

import React, { Component } from "react";

import Canvas from "../../containers/Canvas";
import PropertiesEditor from "../../containers/PropertiesEditor";

type Props = {};

export default class Home extends Component<Props> {
  render() {
    return (
      <div>
        <Canvas />
        <PropertiesEditor />
      </div>
    );
  }
}
