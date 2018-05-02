// @flow

import { EDITOR_UPDATE_CANVASES } from '../types/editor';
import type { EditorUpdateCanvasesType } from '../types/editor';

export type UpdateCanvasesActionType = {
  type: EditorUpdateCanvasesType,
};
export const updateCanvases = (): UpdateCanvasesActionType => ({
  type: EDITOR_UPDATE_CANVASES,
});
