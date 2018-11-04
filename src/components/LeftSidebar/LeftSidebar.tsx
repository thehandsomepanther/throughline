import * as React from 'react';
import styled from 'react-emotion';
import NewShapeEditor from '../../containers/NewShapeEditor';
import OrderEditor from '../../containers/OrderEditor';
import { COLOR_NEAR_BLACK } from '../../styles';

const LeftSidebar = styled('div')`
  width: 300px;
  height: 100vh;
  background-color: ${COLOR_NEAR_BLACK};
  border-right: 4px solid ${COLOR_NEAR_BLACK};
`;

export default () => (
  <LeftSidebar>
    <OrderEditor />
    <NewShapeEditor />
  </LeftSidebar>
);
