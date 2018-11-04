import styled from 'react-emotion';
import { COLOR_NEAR_BLACK, COLOR_NEAR_WHITE, COLOR_RED, FONT_SIZE_SMALL, FONT_STACK_MONOSPACE } from '../../styles';

export const CanvasEditorContainer = styled('div')`
  padding-top: 70px ;
`;

export const CanvasesContainer = styled('div')`
  position: relative;
  display: flex;
  justify-content: center;
`;

export const CanvasContainer = styled('div')`
  background-color: ${COLOR_NEAR_WHITE};
  width: 600px;
  height: 600px;
  border-radius: 4px;
`;

export const DummyCanvasContainer = styled('div')`
  display: none;
`;

export const TickMarkersContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

interface TickMarkerProps {
  active: boolean;
};
export const TickMarker = styled('div')`
  position: relative;
  width: 2px;
  height: ${(props: TickMarkerProps): string =>
    props.active ? '40px' : '20px'};
  margin-left: 2px;
  margin-right: 2px;
  background-color: ${(props: TickMarkerProps): string =>
    props.active ? COLOR_RED : COLOR_NEAR_WHITE};
  cursor: pointer;

  &:hover {
    height: 40px;
  }
`;

export const TickMarkerNumber = styled('span')`
  position: absolute;
  text-align: center;
  bottom: -20px;
  transform: translateX(-50%);
  left: 1px;
  font-family: ${FONT_STACK_MONOSPACE};
  font-size: ${FONT_SIZE_SMALL};
  color: ${(props: TickMarkerProps): string =>
    props.active ? COLOR_RED : COLOR_NEAR_WHITE};
  white-space: nowrap;
`;

export const ControlsContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

export const NotificationContainer = styled('div')`
  position: absolute;
  top: 2rem;
  left: 2rem;
  right: 2rem;
  color: ${COLOR_NEAR_BLACK};
  text-align: center;
`;
