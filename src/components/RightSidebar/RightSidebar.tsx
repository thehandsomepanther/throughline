import * as React from 'react';
import styled from 'react-emotion';
import PropertiesEditor from '../../containers/PropertiesEditor';
import { COLOR_NEAR_BLACK } from '../../styles';

const RightSidebar = styled('div')`
  width: 400px;
  border-left: 4px solid ${COLOR_NEAR_BLACK};
`;

export default () => (
  <RightSidebar>
    <PropertiesEditor />
  </RightSidebar>
);
