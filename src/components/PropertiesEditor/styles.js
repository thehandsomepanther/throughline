// @flow

import styled from 'react-emotion';
import {
  FONT_STACK_MONOSPACE,
  COLOR_NEAR_WHITE,
  COLOR_NEAR_BLACK,
  COLOR_GREY,
} from '../../styles';

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

export const FunctionPropertyInput = styled('input')`
  width: 100%;
  background-color: black;
  color: white;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  -o-appearance: none;
  outline: none;
  border: none;
  box-shadow: none;
  font-family: ${FONT_STACK_MONOSPACE};
  padding: 0.5rem;
  border-radius: 4px;
  margin-top: 0.5rem;
`;
