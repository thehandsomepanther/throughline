// @flow

import styled from 'react-emotion';

export const CanvasEditorContainer = styled('div')``;

type CanvasContainerPropsType = {
  index: number,
  activeCanvas: number,
  key: string | number,
};
export const CanvasContainer = styled('div')`
  display: ${(props: CanvasContainerPropsType): string =>
    props.index === props.activeCanvas ? 'block' : 'none'};
  background-color: white;
`;

export const TickMarkersContainer = styled('div')`
  display: flex;
  align-items: center;
`;

type TickMarkerPropsType = {
  index: number,
  activeCanvas: number,
};
export const TickMarker = styled('div')`
  width: 2px;
  height: ${(props: TickMarkerPropsType): string =>
    props.index === props.activeCanvas ? '40px' : '20px'};
  width: 2px;
  margin-left: 2px;
  margin-right: 2px;
  background-color: #fefefe;
`;
