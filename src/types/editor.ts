export enum EditorAction {
  RedrawCanvases = 'EDITOR_REDRAW_CANVASES',
  ResetRedrawCanvases = 'EDITOR_RESET_REDRAW_CANVASES',
  ChangeActiveShape = 'EDITOR_CHANGE_ACTIVE_SHAPE',
  AddErroneousProp = 'EDITOR_ADD_ERRONEOUS_PROP',
  RemoveErroneousProp = 'EDITOR_REMOVE_ERRONEOUS_PROP',
  ResetErroneousProp = 'EDITOR_RESET_ERRONEOUS_PROP',
  ChangeActiveFrame = 'EDITOR_CHANGE_ACTIVE_FRAME',
}

export interface EditorState {
  activeShape?: string;
  shouldRedrawCanvases: boolean;
  erroneousProps: {
    [key: string]: {
      [key: string]: true,
    },
  };
  numFrames: number;
  activeFrame: number;
}
