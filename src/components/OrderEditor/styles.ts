import styled from 'react-emotion';
import {
  COLOR_BLUE,
  COLOR_NEAR_BLACK,
  COLOR_NEAR_WHITE,
  FONT_SIZE_REGULAR,
  FONT_STACK_MONOSPACE,
  mixins
} from '../../styles';

export const ShapesList = styled('ol')`
  display: flex;
  flex-direction: column;
`;

interface LayerProps {
  active: boolean;
  visible: boolean;
}
export const Layer = styled('li')`
  height: 40px;
  opacity: ${(props: LayerProps): string => (props.visible ? '1' : '0.3')};
  background-color: ${(props: LayerProps): string =>
    props.active ? COLOR_BLUE : COLOR_NEAR_BLACK};
  color: ${COLOR_NEAR_WHITE};
  font-size: ${FONT_SIZE_REGULAR};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 4px;
  padding-right: 4px;
  font-family: ${FONT_STACK_MONOSPACE};
  ${(props: LayerProps): string => (props.active ? '' : mixins.antialias)};
`;

export const LayerName = styled('div')`
  display: flex;
  align-items: center;
  line-height: 24px;

  & input {
    margin-right: 4px;
  }
`;

export const LayerIcons = styled('div')`
  & input {
    margin-left: 4px;
  }
`;
