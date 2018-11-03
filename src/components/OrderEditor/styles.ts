import styled from 'react-emotion';
import {
  COLOR_GREY,
  COLOR_NEAR_BLACK,
  COLOR_NEAR_WHITE,
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
  padding: 0.8rem;
  display: block;
  background-color: ${(props: ShapesListItemPropsType): string =>
    props.active ? COLOR_NEAR_WHITE : COLOR_GREY};
  color: ${(props: ShapesListItemPropsType): string =>
    props.active ? COLOR_NEAR_BLACK : COLOR_NEAR_WHITE};
  ${(props: ShapesListItemPropsType): string =>
    props.active ? '' : RULE_ANTIALIAS};
  border-radius: 4px;
  margin-bottom: 4px;
  font-size: 0.8rem;
  cursor: pointer;
`;
