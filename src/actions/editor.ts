import { EditorAction } from '../types/editor';

export interface RedrawCanvasesAction {
  type: EditorAction.RedrawCanvases;
}
export const redrawCanvases = (): RedrawCanvasesAction => ({
  type: EditorAction.RedrawCanvases
});

export interface ResetRedrawCanvasesAction {
  type: EditorAction.ResetRedrawCanvases;
}
export const resetRedrawCanvases = (): ResetRedrawCanvasesAction => ({
  type: EditorAction.ResetRedrawCanvases
});

export interface ChangeActiveShapeAction {
  type: EditorAction.ChangeActiveShape;
  shape: string;
}
export const changeActiveShape = (shape: string): ChangeActiveShapeAction => ({
  type: EditorAction.ChangeActiveShape,
  shape
});

export interface AddErroneousPropAction {
  type: EditorAction.AddErroneousProp;
  shapeID: string;
  prop: string;
}
export const addErroneousProp = (
  shapeID: string,
  prop: string
): AddErroneousPropAction => ({
  type: EditorAction.AddErroneousProp,
  shapeID,
  prop
});

export interface RemoveErroneousPropAction {
  type: EditorAction.RemoveErroneousProp;
  shapeID: string;
  prop: string;
}
export const removeErroneousProp = (
  shapeID: string,
  prop: string
): RemoveErroneousPropAction => ({
  type: EditorAction.RemoveErroneousProp,
  shapeID,
  prop
});

export interface ResetErroneousPropsAction {
  type: EditorAction.ResetErroneousProp;
}
export const resetErroneousProps = (): ResetErroneousPropsAction => ({
  type: EditorAction.ResetErroneousProp
});

export interface ChangeActiveFrameAction {
  type: EditorAction.ChangeActiveFrame;
  frame: number;
}
export const changeActiveFrame = (frame: number): ChangeActiveFrameAction => ({
  type: EditorAction.ChangeActiveFrame,
  frame
});
