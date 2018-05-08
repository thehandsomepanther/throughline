// @flow

import styled from 'react-emotion';
import {
  COLOR_NEAR_BLACK,
  COLOR_NEAR_WHITE,
  COLOR_YELLOW,
  FONT_STACK_LUNCH,
} from '../../styles';

export const Home = styled('div')`
  display: flex;
  background-color: ${COLOR_YELLOW};
  color: ${COLOR_NEAR_WHITE};
  height: 100vh;
  overflow-y: hidden;
  font-family: ${FONT_STACK_LUNCH};
`;
