import * as React from 'react';
import styled from 'react-emotion';
import PropertiesEditor from '../../containers/PropertiesEditor';

const RightSidebar = styled('div')`
  width: 30%;
`;

export default () => (
  <RightSidebar>
    <PropertiesEditor />
  </RightSidebar>
);
