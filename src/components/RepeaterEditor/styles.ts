import styled from 'react-emotion';
import {
  COLOR_BLACK,
  COLOR_NEAR_WHITE,
  FONT_SIZE_SMALL,
  FONT_STACK_MONOSPACE,
  mixins
} from '../../styles';

export const RepeatersContainer = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

interface RepeatersLayerProps {
  nesting: number;
}
export const RepeatersLayer = styled('div')`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-left: 4px;
  padding-right: 4px;
  padding-left: ${(props: RepeatersLayerProps) => 8 * (props.nesting + 1)}px;
  background-color: rgba(
    0,
    0,
    0,
    ${(props: RepeatersLayerProps) => 0.1 * (props.nesting + 1)}
  );

  & > div > input {
    margin-left: 4px;
  }
`;

export const RepeatersInputContainer = styled('div')`
  display: flex;
  align-items: center;

  & div {
    margin-right: 4px;
  }

  & input {
    ${mixins.resetInput} display: inline;
    width: 28px;
    text-align: center;
    color: ${COLOR_NEAR_WHITE};
    background-color: ${COLOR_BLACK};
    font-size: ${FONT_SIZE_SMALL};
    font-family: ${FONT_STACK_MONOSPACE};
    padding: 0.5rem;
    border-radius: 3px;
    margin: 0 4px;
  }
`;
