import React from 'react';
import styled from 'react-emotion';
import OrderEditor from '../../containers/OrderEditor';
import NewShapeEditor from '../../containers/NewShapeEditor';

const LeftSidebar = styled('div')`
  width: 20%;
  margin-left: 1rem;
  margin-top: 1rem;
`;

export default () => (
  <LeftSidebar>
    <OrderEditor />
    <NewShapeEditor />
  </LeftSidebar>
);
