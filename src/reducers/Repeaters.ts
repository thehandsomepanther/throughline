import { Action } from '../actions';
import { RepeatersAction, RepeatersState } from '../types/repeaters';
import { uniqueRepeaterID } from '../util';

const CHARCODE_LOWERCASE_A = 97;
const CHARCODE_LOWERCASE_I = 105;
const CHARCODE_LOWERCASE_Z = 122;

let charIndex = CHARCODE_LOWERCASE_I - CHARCODE_LOWERCASE_A + 1;
const getNextVariableName = () => {
  let charCode = charIndex;
  let variable = '';

  while (charCode + CHARCODE_LOWERCASE_A - 1 > CHARCODE_LOWERCASE_Z) {
    charCode -= CHARCODE_LOWERCASE_Z - CHARCODE_LOWERCASE_A + 1;
    variable += String.fromCharCode(CHARCODE_LOWERCASE_Z);
  }

  variable += String.fromCharCode(charCode + CHARCODE_LOWERCASE_A - 1);
  charIndex += 1;
  return variable;
};

const initialState: RepeatersState = {};

export default (
  state: RepeatersState = initialState,
  action: Action
): RepeatersState => {
  const newState = { ...state };

  switch (action.type) {
    case RepeatersAction.AddRootRepeater: {
      const nextVariableName = getNextVariableName();
      newState[action.shapeID] = {
        times: 1,
        variable: nextVariableName,
        defaultVariable: nextVariableName,
        next: null,
        prev: null
      };

      return newState;
    }
    case RepeatersAction.AddChildRepeater: {
      const newRepeaterID = uniqueRepeaterID();
      const nextVariableName = getNextVariableName();

      newState[action.repeaterID] = {
        ...newState[action.repeaterID],
        next: newRepeaterID
      };

      newState[newRepeaterID] = {
        times: 1,
        variable: nextVariableName,
        defaultVariable: nextVariableName,
        next: null,
        prev: action.repeaterID
      };

      return newState;
    }
    case RepeatersAction.DeleteRepeater:
      if (!state[action.repeaterID]) {
        throw new Error(
          `Called delete repeater on a non-existant repeater: ${
            action.repeaterID
          }`
        );
      }

      let orphanID: string | null = action.repeaterID;
      while (orphanID) {
        const next: string | null = newState[orphanID].next;
        delete newState[orphanID];
        orphanID = next;
      }

      // TODO(josh): For now, iterating over the entire repeaters state
      // doesn't seem bad because we probably won't have a ton of repeaters.
      // If this gets bad though we may want to consider giving each repeater
      // a pointer to its parent.
      for (const repeaterID in newState) {
        if (!newState.hasOwnProperty(repeaterID)) {
          continue;
        }

        const repeater = newState[repeaterID];
        if (repeater.next === action.repeaterID) {
          newState[repeaterID].next = null;
        }
      }

      return newState;
    case RepeatersAction.UpdateRepeater:
      if (!state[action.repeaterID]) {
        throw new Error(
          `Called update repeater on a non-existant repeater: ${
            action.repeaterID
          }`
        );
      }

      newState[action.repeaterID] = {
        ...newState[action.repeaterID],
        times: action.times,
        variable: action.variable
      };

      return newState;
    default:
      return state;
  }
};
