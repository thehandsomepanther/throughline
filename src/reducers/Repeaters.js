// @flow

import { pickBy } from 'lodash';
import type { RepeatersStateType, RepeaterType } from '../types/repeaters';
import type { ActionType } from '../actions';
import makeDefaultRepeater from '../util/makeDefaultRepeater';

const initialState: RepeatersStateType = {};

export default (
  state: RepeatersStateType = initialState,
  action: ActionType,
): RepeatersStateType => {
  switch (action.type) {
    case 'REPEATER_ADD_REPEATER':
      return {
        ...state,
        [action.key]: makeDefaultRepeater(action.shape),
      };
    case 'REPEATER_DELETE_REPEATER':
      const { key } = action;
      return pickBy(
        state,
        (value: RepeaterType, k: string): boolean => k !== key,
      );
    default:
      return state;
  }
};
