// @flow

import React from 'react';
import styled from 'react-emotion';
import OrderEditor from '../../containers/OrderEditor';

const LeftSidebar = styled('div')`
  width: 25%;
`;

export default (): ?React$Element<any> => (
  <LeftSidebar>
    <OrderEditor />
  </LeftSidebar>
);
