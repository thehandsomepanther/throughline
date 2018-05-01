// @flow

import React, { Component } from 'react';

import LeftSidebar from '../../components/LeftSidebar';
import Canvas from '../../containers/Canvas';
import RightSidebar from '../../components/RightSidebar';

type PropsType = {};

export default class Home extends Component<PropsType> {
  render() {
    return (
      <div>
        <LeftSidebar />
        <Canvas />
        <RightSidebar />
      </div>
    );
  }
}
