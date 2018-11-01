import { orderInitialState } from './Order';
import { EditorState, EditorAction } from '../types/editor';
import { ShapesAction } from '../types/shapes';
import { ShapeValuesAction } from '../types/shapeValues';
import { RepeatersAction } from '../types/repeaters';
import { Action } from '../actions';

const initialState: EditorState = {
  activeShape: orderInitialState[0],
  shouldRedrawCanvases: false,
  erroneousProps: {},
  numFrames: 60,
  activeFrame: 0,
};

export default (
  state: EditorState = initialState,
  action: Action,
): EditorState => {
  let newState;

  switch (action.type) {
    case ShapesAction.UpdateUsing:
    case ShapesAction.UpdateConst:
    case ShapesAction.UpdateFunction:
    case ShapesAction.DeleteShape:
    case ShapeValuesAction.ResetValues:
    case ShapeValuesAction.SetValues:
    case ShapeValuesAction.UpdateValues:
    case RepeatersAction.UpdateRepeater:
      return {
        ...state,
        shouldRedrawCanvases: true,
      };
    case EditorAction.ChangeActiveShape:
      return {
        ...state,
        activeShape: action.shape,
      };
    case EditorAction.ResetRedrawCanvases:
      return {
        ...state,
        shouldRedrawCanvases: false,
      };
    case EditorAction.AddErroneousProp:
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
        erroneousProps: {},
      };
    case EditorAction.ChangeActiveFrame:
      return {
        ...state,
        activeFrame: action.frame,
      };
    default:
      return state;
  }
};
