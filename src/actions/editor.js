// @flow

import {
  EDITOR_REDRAW_CANVASES,
  EDITOR_RESET_REDRAW_CANVASES,
  EDITOR_CHANGE_ACTIVE_SHAPE,
  EDITOR_ADD_ERRONEOUS_PROP,
  EDITOR_RESET_ERRONEOUS_PROP,
  EDITOR_CHANGE_ACTIVE_FRAME,
  EDITOR_REMOVE_ERRONEOUS_PROP,
} from '../types/editor';
import type {
  EditorRedrawCanvasesType,
  EditorResetRedrawCanvasesType,
  EditorChangeActiveShapeType,
  EditorAddErroneousPropType,
  EditorResetErroneousPropType,
  EditorChangeActiveFrameType,
  EditorRemoveErroneousPropType,
} from '../types/editor';

export type RedrawCanvasesActionType = {
  type: EditorRedrawCanvasesType,
};
export type RedrawCanvasesType = () => RedrawCanvasesActionType;
export const redrawCanvases = (): RedrawCanvasesActionType => ({
  type: EDITOR_REDRAW_CANVASES,
});

export type ResetRedrawCanvasesActionType = {
  type: EditorResetRedrawCanvasesType,
};
export type ResetRedrawCanvasesType = () => ResetRedrawCanvasesActionType;
export const resetRedrawCanvases = (): ResetRedrawCanvasesActionType => ({
  type: EDITOR_RESET_REDRAW_CANVASES,
});

export type ChangeActiveShapeActionType = {
  type: EditorChangeActiveShapeType,
  shape: string,
};
export type ChangeActiveShapeType = (
  shape: string,
) => ChangeActiveShapeActionType;
export const changeActiveShape = (
  shape: string,
): ChangeActiveShapeActionType => ({
  type: EDITOR_CHANGE_ACTIVE_SHAPE,
  shape,
});

export type AddErroneousPropActionType = {
  type: EditorAddErroneousPropType,
  shape: string,
  prop: string,
};
export type AddErroneousPropType = (
  shape: string,
  prop: string,
) => AddErroneousPropActionType;
export const addErroneousProp = (
  shape: string,
  prop: string,
): AddErroneousPropActionType => ({
  type: EDITOR_ADD_ERRONEOUS_PROP,
  shape,
  prop,
});

export type RemoveErroneousPropActionType = {
  type: EditorRemoveErroneousPropType,
  shape: string,
  prop: string,
};
export type RemoveErroneousPropType = (
  shape: string,
  prop: string,
) => RemoveErroneousPropActionType;
export const removeErroneousProp = (
  shape: string,
  prop: string,
): RemoveErroneousPropActionType => ({
  type: EDITOR_REMOVE_ERRONEOUS_PROP,
  shape,
  prop,
});

export type ResetErroneousPropsActionType = {
  type: EditorResetErroneousPropType,
};
export type ResetErroneousPropsType = () => ResetErroneousPropsActionType;
export const resetErroneousProps = (): ResetErroneousPropsActionType => ({
  type: EDITOR_RESET_ERRONEOUS_PROP,
});

export type ChangeActiveFrameActionType = {
  type: EditorChangeActiveFrameType,
  frame: number,
};
export type ChangeActiveFrameType = (
  frame: number,
) => ChangeActiveFrameActionType;
export const changeActiveFrame = (
  frame: number,
): ChangeActiveFrameActionType => ({
  type: EDITOR_CHANGE_ACTIVE_FRAME,
  frame,
});
