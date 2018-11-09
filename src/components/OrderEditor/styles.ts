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

interface LayerContainerProps {
  active: boolean;
  visible: boolean;
}
export const LayerContainer = styled('li')`
  opacity: ${(props: LayerContainerProps): string =>
    props.visible ? '1' : '0.3'};
  background-color: ${(props: LayerContainerProps): string =>
    props.active ? COLOR_BLUE : COLOR_NEAR_BLACK};
  color: ${COLOR_NEAR_WHITE};
  font-size: ${FONT_SIZE_REGULAR};
  display: flex;
  align-items: center;
  flex-direction: column;
  font-family: ${FONT_STACK_MONOSPACE};
  ${(props: LayerContainerProps): string =>
    props.active ? '' : mixins.antialias};
`;

export const Layer = styled('div')`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-left: 4px;
  padding-right: 4px;
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
