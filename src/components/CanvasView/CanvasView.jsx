// @flow

import React from 'react';
import styled from 'react-emotion';
import Canvas from '../../containers/Canvas';

const CanvasView = styled('div')`
  width: 50%;
`;

export default (): ?React$Element<any> => (
  <CanvasView>
    <Canvas />
  </CanvasView>
);
