import { RepeatersState, RepeatersAction } from '../types/repeaters';
import { Action } from '../actions';

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
  action: Action,
): RepeatersState => {
  let newRepeater;

  switch (action.type) {
    case RepeatersAction.AddRepeater:
      return {
        ...state,
        [action.key]: state[action.key]
          ? [
              ...state[action.key],
              { times: 1, variable: getNextVariableName() },
            ]
          : [{ times: 1, variable: getNextVariableName() }],
      };
    case RepeatersAction.DeleteRepetition:
      if (!state[action.key]) {
        throw new Error(
          `Called delete repeater on an empty repeater: ${action.key}`,
        );
      }

      newRepeater = [...state[action.key]];
      newRepeater.splice(action.index, 1);
      return {
        ...state,
        [action.key]: newRepeater,
      };
    case RepeatersAction.UpdateRepeater:
      if (!state[action.key]) {
        throw new Error(
          `Called update repeater on an empty repeater: ${action.key}`,
        );
      }

      newRepeater = [...state[action.key]];
      newRepeater[action.index] = {
        times: action.times,
        variable: action.variable,
      };

      return {
        ...state,
        [action.key]: newRepeater,
      };
    default:
      return state;
  }
};
