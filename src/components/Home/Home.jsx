// @flow

import React from 'react';
import styled from 'react-emotion';

import LeftSidebar from '../../components/LeftSidebar';
import CanvasView from '../../components/CanvasView';
import RightSidebar from '../../components/RightSidebar';

const Home = styled('div')`
  display: flex;
`;

export default (): ?React$Element<any> => (
  <Home className="flex">
    <LeftSidebar />
    <CanvasView />
    <RightSidebar />
  </Home>
);
