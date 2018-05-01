// @flow

import React, { Component } from 'react';

import Canvas from '../../containers/Canvas';
import PropertiesEditor from '../../containers/PropertiesEditor';

type PropsType = {};

export default class Home extends Component<PropsType> {
  render() {
    return (
      <div>
        <Canvas />
        <PropertiesEditor />
      </div>
    );
  }
}
