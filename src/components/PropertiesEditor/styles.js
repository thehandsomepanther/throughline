// @flow

import styled from 'react-emotion';
import { COLOR_NEAR_WHITE, COLOR_NEAR_BLACK, COLOR_GREY } from '../../styles';

export const PropertiesEditorContainer = styled('div')`
  margin-top: 1rem;
  margin-right: 1rem;
  padding: 0.8rem;
  background-color: ${COLOR_NEAR_WHITE};
  border-radius: 4px;
`;

export const ShapeInfo = styled('div')`
  color: ${COLOR_NEAR_BLACK};
`;

export const PropertyInfoContainer = styled('div')`
  margin-top: 1rem;
  border-top: 1px solid ${COLOR_GREY};
`;

export const PropertyName = styled('div')`
  color: ${COLOR_NEAR_BLACK};
  margin-top: 1rem;
  display: inline-block;
  margin-right: 1rem;
`;
