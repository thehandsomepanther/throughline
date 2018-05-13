// @flow

import {
  EDITOR_UPDATE_CANVASES,
  EDITOR_CHANGE_ACTIVE_SHAPE,
  EDITOR_ADD_ERRONEOUS_PROP,
  EDITOR_RESET_ERRONEOUS_PROP,
} from '../types/editor';
import type {
  EditorUpdateCanvasesType,
  EditorChangeActiveShapeType,
  EditorAddErroneousPropType,
  EditorResetErroneousPropType,
} from '../types/editor';

export type UpdateCanvasesActionType = {
  type: EditorUpdateCanvasesType,
};
export const updateCanvases = (): UpdateCanvasesActionType => ({
  type: EDITOR_UPDATE_CANVASES,
});

export type ChangeActiveShapeActionType = {
  type: EditorChangeActiveShapeType,
  shape: string,
};
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
export const resetErroneousProps = (): ResetErroneousPropsActionType => ({
  type: EDITOR_RESET_ERRONEOUS_PROP,
});
