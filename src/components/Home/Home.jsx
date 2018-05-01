// @flow

import React from 'react';

import LeftSidebar from '../../components/LeftSidebar';
import Canvas from '../../containers/Canvas';
import RightSidebar from '../../components/RightSidebar';

export default (): ?React$Element<any> => (
  <div>
    <LeftSidebar />
    <Canvas />
    <RightSidebar />
  </div>
);
