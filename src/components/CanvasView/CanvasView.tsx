import React from 'react';
import styled from 'react-emotion';
import CanvasEditor from '../../containers/CanvasEditor';

const CanvasView = styled('div')`
  width: 50%;
`;

export default () => (
  <CanvasView>
    <CanvasEditor />
  </CanvasView>
);
