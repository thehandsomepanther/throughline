// @flow

import React from 'react';

import LeftSidebar from '../../components/LeftSidebar';
import CanvasView from '../../components/CanvasView';
import RightSidebar from '../../components/RightSidebar';

import { Home } from './styles';

export default (): ?React$Element<any> => (
  <Home>
    <LeftSidebar />
    <CanvasView />
    <RightSidebar />
  </Home>
);
