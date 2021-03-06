import styled from 'react-emotion';
import {
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_GREY,
  COLOR_NEAR_BLACK,
  COLOR_NEAR_WHITE,
  COLOR_YELLOW,
  FONT_SIZE_REGULAR,
  FONT_SIZE_SMALL,
  FONT_STACK_MONOSPACE,
  mixins
} from '../../styles';
import { Using } from '../../types/formulas';

export const PropertiesEditorContainer = styled('div')`
  background-color: ${COLOR_NEAR_WHITE};
  height: 100vh;
  overflow-y: scroll;
`;

export const ShapeInfo = styled('div')`
  color: ${COLOR_NEAR_BLACK};
`;

export const PropertyInfoContainer = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-bottom: 1px solid ${COLOR_BLACK};
  background-color: ${COLOR_NEAR_BLACK};
  color: ${COLOR_NEAR_WHITE};
`;

export const PropertyInfoHeader = styled('div')`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  justify-content: space-between;

  & > div {
    display: flex;
    align-items: center;
  }
`;

export const InvalidPropNotification = styled('div')`
  background-color: ${COLOR_YELLOW};
  padding-left: 4px;
  padding-right: 4px;
  height: 16px;
  line-height: 16px;
  color: ${COLOR_NEAR_BLACK};
  border-radius: 3px;
  font-family: ${FONT_STACK_MONOSPACE};
  font-size: ${FONT_SIZE_SMALL};
`;

export const PropertyName = styled('div')`
  font-size: ${FONT_SIZE_REGULAR};
  font-family: ${FONT_STACK_MONOSPACE};
  margin-right: 4px;
`;

interface UsingDropdownProps {
  value: Using;
}
export const UsingDropdown = styled('select')`
  font-size: ${FONT_SIZE_SMALL};
  font-family: ${FONT_STACK_MONOSPACE};
  background-color: ${(props: UsingDropdownProps): string => {
    switch (props.value) {
      case Using.Function:
        return COLOR_BLUE;
      default:
        return COLOR_GREY;
    }
  }};
  color: ${(props: UsingDropdownProps): string => {
    switch (props.value) {
      case Using.Function:
        return COLOR_NEAR_WHITE;
      default:
        return COLOR_NEAR_BLACK;
    }
  }};
`;

const INPUT_STYLES = `
  color: ${COLOR_NEAR_WHITE};
  background-color: ${COLOR_BLACK};
  font-size: ${FONT_SIZE_SMALL};
  font-family: ${FONT_STACK_MONOSPACE};
  padding: 0.5rem;
  border-radius: 3px;
  width: 100%;
`;

export const ConstantPropertyInput = styled('input')`
  ${mixins.resetInput} ${INPUT_STYLES};
`;

export const FunctionPropertyInputContainer = styled('div')`
  color: ${COLOR_GREY};
  background-color: ${COLOR_BLACK};
  font-size: ${FONT_SIZE_SMALL};
  font-family: ${FONT_STACK_MONOSPACE};
  padding: 0.5rem;
  border-radius: 3px;
  margin-bottom: 10px;
`;

export const FunctionPropertyInput = styled('textarea')`
  ${mixins.resetInput} ${INPUT_STYLES};
`;
