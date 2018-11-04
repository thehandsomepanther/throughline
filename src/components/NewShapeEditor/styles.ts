import styled from 'react-emotion';
import { COLOR_BLACK, COLOR_BLUE, COLOR_NEAR_BLACK, COLOR_NEAR_WHITE, COLOR_ORANGE, FONT_SIZE_REGULAR, FONT_STACK_MONOSPACE, mixins } from '../../styles';

export const NewShapeButtonContainer = styled('div')`
  width: 100%;
`;

export const NewShapeButton = styled('input')`
  ${mixins.resetInput}
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: ${FONT_SIZE_REGULAR};
  font-family: ${FONT_STACK_MONOSPACE};
  background-color: ${COLOR_NEAR_BLACK};
  color: ${COLOR_NEAR_WHITE};
  text-align: left;
  padding-left: 20px;
  cursor: pointer;
  transition: .1s background-color ease-in;

  &:hover {
    background-color: ${COLOR_BLACK};
  }
`;

export const NewShapeForm = styled('form')`
  width: 100%;
  line-height: 40px;
`;

export const NewShapeInputContainer = styled('div')`
  display: flex;
`;

export const NewShapeDropdownInput = styled('select')`
  ${mixins.resetInput}
  height: 40px;
  width: 50%;
  text-align: center;
  font-family: ${FONT_STACK_MONOSPACE};
  font-size: ${FONT_SIZE_REGULAR};
  text-align-last:center;
`;

export const NewShapeNameInput = styled('input')`
  ${mixins.resetInput}
  height: 40px;
  background-color: ${COLOR_NEAR_BLACK};
  color: ${COLOR_NEAR_WHITE};
  font-family: ${FONT_STACK_MONOSPACE};
  font-size: ${FONT_SIZE_REGULAR};
  text-align: center;
  width: 50%;
`;

interface NewShapeSubmitInputProps {
  name: string;
};
export const NewShapeSubmitInput = styled('input')`
  ${mixins.resetInput}
  width: 100%;
  height: 40px;
  background-color: ${(props: NewShapeSubmitInputProps): string =>
    !!props.name ? COLOR_BLUE : COLOR_ORANGE
  };
  color: ${(props: NewShapeSubmitInputProps): string =>
    !!props.name ? COLOR_NEAR_WHITE : COLOR_NEAR_BLACK
  };
  font-family: ${FONT_STACK_MONOSPACE};
  font-size: ${FONT_SIZE_REGULAR};
  text-align: center;
  cursor: pointer;
  transition: .1s opacity ease-in;
`;
