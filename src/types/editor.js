// @flow

export const EDITOR_REDRAW_CANVASES = 'EDITOR_REDRAW_CANVASES';
export type EditorRedrawCanvasesType = 'EDITOR_REDRAW_CANVASES';

export const EDITOR_RESET_REDRAW_CANVASES = 'EDITOR_RESET_REDRAW_CANVASES';
export type EditorResetRedrawCanvasesType = 'EDITOR_RESET_REDRAW_CANVASES';

export const EDITOR_CHANGE_ACTIVE_SHAPE = 'EDITOR_CHANGE_ACTIVE_SHAPE';
export type EditorChangeActiveShapeType = 'EDITOR_CHANGE_ACTIVE_SHAPE';

export const EDITOR_ADD_ERRONEOUS_PROP = 'EDITOR_ADD_ERRONEOUS_PROP';
export type EditorAddErroneousPropType = 'EDITOR_ADD_ERRONEOUS_PROP';

export const EDITOR_REMOVE_ERRONEOUS_PROP = 'EDITOR_REMOVE_ERRONEOUS_PROP';
export type EditorRemoveErroneousPropType = 'EDITOR_REMOVE_ERRONEOUS_PROP';

export const EDITOR_RESET_ERRONEOUS_PROP = 'EDITOR_RESET_ERRONEOUS_PROP';
export type EditorResetErroneousPropType = 'EDITOR_RESET_ERRONEOUS_PROP';

export const EDITOR_CHANGE_ACTIVE_FRAME = 'EDITOR_CHANGE_ACTIVE_FRAME';
export type EditorChangeActiveFrameType = 'EDITOR_CHANGE_ACTIVE_FRAME';

export type EditorStateType = {
  +activeShape: ?string,
  +shouldRedrawCanvases: boolean,
  +erroneousProps: {
    +[key: string]: {
      +[key: string]: true,
    },
  },
  +numFrames: number,
  +activeFrame: number,
};
