import styled from 'react-emotion';
import {
  COLOR_BLACK,
  COLOR_GREY,
  FONT_SIZE_SMALL,
  FONT_STACK_MONOSPACE,
} from '../';

export const SidebarHeader = styled('div')`
  display: flex;
  height: 40px;
  background-color: ${COLOR_BLACK};
  color: ${COLOR_GREY};
  padding-left: 20px;
  font-family: ${FONT_STACK_MONOSPACE};
  font-size: ${FONT_SIZE_SMALL};
  align-items: center;
`;