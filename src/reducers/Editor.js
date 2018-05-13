// @flow

import type { EditorStateType } from '../types/editor';
import type { ActionType } from '../actions';

const initialState: EditorStateType = {
  activeShape: 'test1',
  shouldUpdateCanvases: false,
  erroneousProps: {},
};

export default (
  state: EditorStateType = initialState,
  action: ActionType,
): EditorStateType => {
  let tempState;

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
        shouldUpdateCanvases: true,
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
    case 'EDITOR_ADD_ERRONEOUS_PROP':
      tempState = { ...state };
      if (!tempState.erroneousProps[action.shape]) {
        tempState.erroneousProps[action.shape] = [];
      }

      return {
        ...tempState,
        erroneousProps: {
          ...state.erroneousProps,
          [action.shape]: [
            ...tempState.erroneousProps[action.shape],
            action.prop,
          ],
        },
      };
    case 'EDITOR_RESET_ERRONEOUS_PROP':
      return {
        ...state,
        erroneousProps: {},
      };
    default:
      return state;
  }
};
