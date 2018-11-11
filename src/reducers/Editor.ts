import { Action } from '../actions';
import { EditorAction, EditorState } from '../types/editor';
import { ShapesAction } from '../types/shapes';
import { orderInitialState } from './Order';

const initialState: EditorState = {
  activeShape: orderInitialState[0],
  shouldRedrawFrames: false,
  erroneousProps: {},
  numFrames: 60,
  activeFrame: 0
};

export default (
  state: EditorState = initialState,
  action: Action
): EditorState => {
  let newState;

  switch (action.type) {
    case ShapesAction.DeleteShape:
    case ShapesAction.SetValues:
    case ShapesAction.UpdateValues:
    case ShapesAction.ToggleVisible:
      return {
        ...state,
        shouldRedrawFrames: true
      };
    case EditorAction.ChangeActiveShape:
      return {
        ...state,
        activeShape: action.shape
      };
    case EditorAction.ResetRedrawCanvases:
      return {
        ...state,
        shouldRedrawFrames: false
      };
    case EditorAction.AddErroneousProp:
      return {
        ...state,
        erroneousProps: {
          ...state.erroneousProps,
          [action.shape]: {
            ...(state.erroneousProps[action.shape] || {}),
            [action.prop]: true
          }
        }
      };
    case EditorAction.RemoveErroneousProp:
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
    case EditorAction.ResetErroneousProp:
      return {
        ...state,
        erroneousProps: {}
      };
    case EditorAction.ChangeActiveFrame:
      return {
        ...state,
        activeFrame: action.frame
      };
    default:
      return state;
  }
};
