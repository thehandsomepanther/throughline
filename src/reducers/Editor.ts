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
  let newState = { ...state };

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
      newState.erroneousProps[action.shapeID] = newState.erroneousProps[
        action.shapeID
      ]
        ? {
            ...newState.erroneousProps[action.shapeID],
            [action.prop]: true
          }
        : {
            [action.prop]: true
          };

      return newState;
    case EditorAction.RemoveErroneousProp:
      newState = { ...state };
      if (
        newState.erroneousProps[action.shapeID] &&
        newState.erroneousProps[action.shapeID][action.prop]
      ) {
        delete newState.erroneousProps[action.shapeID][action.prop];

        if (
          Object.getOwnPropertyNames(newState.erroneousProps[action.shapeID])
            .length === 0
        ) {
          delete newState.erroneousProps[action.shapeID];
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
