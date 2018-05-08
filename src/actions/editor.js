// @flow

import {
  EDITOR_UPDATE_CANVASES,
  EDITOR_CHANGE_ACTIVE_SHAPE,
} from '../types/editor';
import type {
  EditorUpdateCanvasesType,
  EditorChangeActiveShapeType,
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
