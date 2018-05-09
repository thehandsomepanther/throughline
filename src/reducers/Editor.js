// @flow

import type { EditorStateType } from '../types/editor';
import type { ActionType } from '../actions';
import { tryEvalFunctionProp } from '../util/shapes';

const initialState: EditorStateType = {
  activeShape: 'test1',
  shouldUpdateCanvases: false,
};

export default (
  state: EditorStateType = initialState,
  action: ActionType,
): EditorStateType => {
  switch (action.type) {
    case 'SHAPE_UPDATE_USING':
    case 'SHAPE_UPDATE_CONST':
      return {
        ...state,
        shouldUpdateCanvases: true,
      };
    case 'SHAPE_UPDATE_FN':
      return {
        ...state,
        shouldUpdateCanvases: tryEvalFunctionProp(action.value, 0) !== null,
      };
    case 'EDITOR_CHANGE_ACTIVE_SHAPE':
      return {
        ...state,
        activeShape: action.shape,
      };
    case 'EDITOR_UPDATE_CANVASES':
      return {
        ...state,
        shouldUpdateCanvases: false,
      };
    default:
      return state;
  }
};
