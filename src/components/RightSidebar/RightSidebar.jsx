// @flow

import React from 'react';
import styled from 'react-emotion';
import PropertiesEditor from '../../containers/PropertiesEditor';

const RightSidebar = styled('div')`
  width: 25%;
`;

export default (): ?React$Element<any> => (
  <RightSidebar>
    <PropertiesEditor />
  </RightSidebar>
);
