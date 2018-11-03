import * as React from 'react';
import styled from 'react-emotion';
import NewShapeEditor from '../../containers/NewShapeEditor';
import OrderEditor from '../../containers/OrderEditor';

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
