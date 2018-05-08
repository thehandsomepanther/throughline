// @flow

import styled from 'react-emotion';
import {
  RULE_ANTIALIAS,
  COLOR_GREY,
  COLOR_NEAR_WHITE,
  COLOR_NEAR_BLACK,
} from '../../styles';

export const ShapesList = styled('ol')`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  margin-top: 1rem;
`;

type ShapesListItemPropsType = {
  active: boolean,
};
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
