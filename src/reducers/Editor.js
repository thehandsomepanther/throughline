// @flow

import type { EditorStateType } from '../types/editor';
import type { ActionType } from '../actions';

const initialState: EditorStateType = {
  activeShape: 'test1',
  shouldRedrawCanvases: false,
  erroneousProps: {},
  numFrames: 60,
  activeFrame: 0,
};

export default (
  state: EditorStateType = initialState,
  action: ActionType,
): EditorStateType => {
  let newState;

  switch (action.type) {
    case 'SHAPE_UPDATE_USING':
    case 'SHAPE_UPDATE_CONST':
    case 'SHAPE_UPDATE_FN':
    case 'ORDER_UPDATE_ORDER':
    case 'SHAPE_VALUES_SET_VALUES':
    case 'SHAPE_VALUES_UPDATE_VALUES':
      return {
        ...state,
        shouldRedrawCanvases: true,
      };
    case 'EDITOR_CHANGE_ACTIVE_SHAPE':
      return {
        ...state,
        activeShape: action.shape,
      };
    case 'EDITOR_UPDATE_CANVASES':
      return {
        ...state,
        shouldRedrawCanvases: false,
      };
    case 'EDITOR_ADD_ERRONEOUS_PROP':
      return {
        ...state,
        erroneousProps: {
          ...state.erroneousProps,
          [action.shape]: {
            ...(state.erroneousProps[action.shape] || {}),
            [action.prop]: true,
          },
        },
      };
    case 'EDITOR_REMOVE_ERRONEOUS_PROP':
      newState = { ...state };
      if (
        newState.erroneousProps[action.shape] &&
        newState.erroneousProps[action.shape][action.prop]
      ) {
        delete newState.erroneousProps[action.shape][action.prop];

        if (
          Object.getOwnPropertyNames(newState.erroneousProps[action.shape])
            .length === 0
        ) {
          delete newState.erroneousProps[action.shape];
        }
      }

      return newState;
    case 'EDITOR_RESET_ERRONEOUS_PROP':
      return {
        ...state,
        erroneousProps: {},
      };
    case 'EDITOR_CHANGE_ACTIVE_FRAME':
      return {
        ...state,
        activeFrame: action.frame,
      };
    default:
      return state;
  }
};
