// @flow

export const EDITOR_UPDATE_CANVASES = 'EDITOR_UPDATE_CANVASES';

export type EditorUpdateCanvasesType = 'EDITOR_UPDATE_CANVASES';

export type EditorStateType = {
  +activeShape: ?string,
  +shouldUpdateCanvases: boolean,
};
