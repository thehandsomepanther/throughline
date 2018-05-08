// @flow

import styled from 'react-emotion';
import { RULE_ANTIALIAS } from '../../styles';

export const ShapesList = styled('ol')`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

type ShapesListItemPropsType = {
  active: boolean,
};
export const ShapesListItem = styled('li')`
  padding: 0.8rem;
  display: block;
  background-color: ${(props: ShapesListItemPropsType): string =>
    props.active ? 'white' : 'black'};
  color: ${(props: ShapesListItemPropsType): string =>
    props.active ? 'black' : 'white'};
  ${(props: ShapesListItemPropsType): string =>
    props.active ? '' : RULE_ANTIALIAS};
  border-radius: 4px;
  margin-bottom: 4px;
  font-size: 0.8rem;
  cursor: pointer;
`;
