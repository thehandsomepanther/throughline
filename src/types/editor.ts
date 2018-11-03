import { EllipseProperties, RectProperties } from './shapes';

export enum EditorAction {
  RedrawCanvases = 'EDITOR_REDRAW_CANVASES',
  ResetRedrawCanvases = 'EDITOR_RESET_REDRAW_CANVASES',
  ChangeActiveShape = 'EDITOR_CHANGE_ACTIVE_SHAPE',
  AddErroneousProp = 'EDITOR_ADD_ERRONEOUS_PROP',
  RemoveErroneousProp = 'EDITOR_REMOVE_ERRONEOUS_PROP',
  ResetErroneousProp = 'EDITOR_RESET_ERRONEOUS_PROP',
  ChangeActiveFrame = 'EDITOR_CHANGE_ACTIVE_FRAME',
};

// The editor branch of the state tree keeps track of:
// - activeShape: The shapeID of the shape currently being modified.
// - shouldRedrawFrames: A flag which indicates whether we need to redraw
//   each frame.
// - erroneousProps: A map of shapeID to a map of shape properties. Each
//   property listed had some error when computing its formula.
// - numFrames: The number of frames to draw.
// - activeFrame: The index of the current frame being displayed.
export interface EditorState {
  activeFrame: number;
  activeShape?: string;
  erroneousProps: {
    [shapeID: string]: Partial<RectProperties<true>> | Partial<EllipseProperties<true>>,
  };
  numFrames: number;
  shouldRedrawFrames: boolean;
};
