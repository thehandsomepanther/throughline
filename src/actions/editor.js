// @flow

import {
  EDITOR_UPDATE_CANVASES,
  EDITOR_CHANGE_ACTIVE_SHAPE,
  EDITOR_ADD_ERRONEOUS_PROP,
  EDITOR_RESET_ERRONEOUS_PROP,
  EDITOR_CHANGE_ACTIVE_FRAME,
} from '../types/editor';
import type {
  EditorUpdateCanvasesType,
  EditorChangeActiveShapeType,
  EditorAddErroneousPropType,
  EditorResetErroneousPropType,
  EditorChangeActiveFrameType,
} from '../types/editor';

export type UpdateCanvasesActionType = {
  type: EditorUpdateCanvasesType,
};
export type UpdateCanvasesType = () => UpdateCanvasesActionType;
export const updateCanvases = (): UpdateCanvasesActionType => ({
  type: EDITOR_UPDATE_CANVASES,
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
