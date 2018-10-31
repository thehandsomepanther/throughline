import styled from 'react-emotion';
import {
  FONT_STACK_MONOSPACE,
  COLOR_NEAR_WHITE,
  COLOR_NEAR_BLACK,
  COLOR_GREY,
  COLOR_YELLOW,
} from '../../styles';

export const PropertiesEditorContainer = styled('div')`
  margin-top: 1rem;
  margin-right: 1rem;
  padding: 0.8rem;
  background-color: ${COLOR_NEAR_WHITE};
  border-radius: 4px;
  height: 100vh;
  overflow-y: scroll;
`;

export const ShapeInfo = styled('div')`
  color: ${COLOR_NEAR_BLACK};
`;

export const PropertyInfoContainer = styled('div')`
  border-top: 1px solid ${COLOR_GREY};
  padding-top: 1rem;
`;

export const InvalidPropNotification = styled('div')`
  margin-bottom: 1rem;
  background-color: ${COLOR_YELLOW};
  padding: 1rem;
  color: ${COLOR_NEAR_BLACK};
  border-radius: 4px;
`;

export const PropertyName = styled('div')`
  color: ${COLOR_NEAR_BLACK};
  display: inline-block;
  margin-right: 1rem;
`;

export const ConstantPropertyInput = styled('input')`
  color: ${COLOR_GREY};
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  -o-appearance: none;
  outline: none;
  border: 1px solid ${COLOR_GREY};
  box-shadow: none;
  font-family: ${FONT_STACK_MONOSPACE};
  padding: 0.5rem;
  border-radius: 4px;
  margin-left: 0.5rem;
`;

export const FunctionPropertyInput = styled('input')`
  width: 100%;
  background-color: ${COLOR_NEAR_BLACK};
  color: ${COLOR_NEAR_WHITE};
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
