// @flow

export const EDITOR_UPDATE_CANVASES = 'EDITOR_UPDATE_CANVASES';
export type EditorUpdateCanvasesType = 'EDITOR_UPDATE_CANVASES';

export const EDITOR_CHANGE_ACTIVE_SHAPE = 'EDITOR_CHANGE_ACTIVE_SHAPE';
export type EditorChangeActiveShapeType = 'EDITOR_CHANGE_ACTIVE_SHAPE';

export type EditorStateType = {
  +activeShape: ?string,
  +shouldUpdateCanvases: boolean,
};
