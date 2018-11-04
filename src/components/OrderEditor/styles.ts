import styled from 'react-emotion';
import {
  COLOR_BLUE,
  COLOR_NEAR_BLACK,
  COLOR_NEAR_WHITE,
  FONT_SIZE_REGULAR,
  FONT_STACK_MONOSPACE,
  RULE_ANTIALIAS,
} from '../../styles';

export const ShapesList = styled('ol')`
  display: flex;
  flex-direction: column;
`;

interface ShapesListItemPropsType {
  active: boolean;
}
export const ShapesListItem = styled('li')`
  height: 40px;
  background-color: ${(props: ShapesListItemPropsType): string =>
    props.active ? COLOR_BLUE : COLOR_NEAR_BLACK};
  color: ${COLOR_NEAR_WHITE};
  font-size: ${FONT_SIZE_REGULAR};
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 10px;
  font-family: ${FONT_STACK_MONOSPACE};
  cursor: pointer;
  ${(props: ShapesListItemPropsType): string =>
    props.active ? '' : RULE_ANTIALIAS}
`;
