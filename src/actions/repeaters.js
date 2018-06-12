// @flow

import {
  REPEATER_ADD_REPEATER,
  REPEATER_DELETE_REPEATER,
} from '../types/repeaters';
import type {
  RepeaterAddRepeaterType,
  RepeaterDeleteRepeaterType,
} from '../types/repeaters';

export type AddRepeaterActionType = {
  type: RepeaterAddRepeaterType,
  key: string,
  shape: string,
};
export type AddRepeaterType = (
  key: string,
  shape: string,
) => AddRepeaterActionType;
export const addRepeater = (
  key: string,
  shape: string,
): AddRepeaterActionType => ({
  type: REPEATER_ADD_REPEATER,
  key,
  shape,
});

export type DeleteRepeaterActionType = {
  type: RepeaterDeleteRepeaterType,
  key: string,
};
export type DeleteRepeaterType = (key: string) => DeleteRepeaterActionType;
export const deleteRepeater = (key: string): DeleteRepeaterActionType => ({
  type: REPEATER_DELETE_REPEATER,
  key,
});
