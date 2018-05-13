// @flow

export const EDITOR_UPDATE_CANVASES = 'EDITOR_UPDATE_CANVASES';
export type EditorUpdateCanvasesType = 'EDITOR_UPDATE_CANVASES';

export const EDITOR_CHANGE_ACTIVE_SHAPE = 'EDITOR_CHANGE_ACTIVE_SHAPE';
export type EditorChangeActiveShapeType = 'EDITOR_CHANGE_ACTIVE_SHAPE';

export const EDITOR_ADD_ERRONEOUS_PROP = 'EDITOR_ADD_ERRONEOUS_PROP';
export type EditorAddErroneousPropType = 'EDITOR_ADD_ERRONEOUS_PROP';

export const EDITOR_RESET_ERRONEOUS_PROP = 'EDITOR_RESET_ERRONEOUS_PROP';
export type EditorResetErroneousPropType = 'EDITOR_RESET_ERRONEOUS_PROP';

export type EditorStateType = {
  +activeShape: ?string,
  +shouldUpdateCanvases: boolean,
  +erroneousProps: {
    +[key: string]: Array<string>,
  },
};
