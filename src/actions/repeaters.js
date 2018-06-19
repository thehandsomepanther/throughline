// @flow

import {
  REPEATER_ADD_REPEATER,
  REPEATER_DELETE_REPEATER,
  REPEATER_UPDATE_REPEATER,
} from '../types/repeaters';
import type {
  RepeaterAddRepeaterType,
  RepeaterDeleteRepeaterType,
  RepeaterUpdateRepeaterType,
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

export type UpdateRepeaterActionType = {
  type: RepeaterUpdateRepeaterType,
  key: string,
  property: string,
  value: string | number,
};
export type UpdateRepeaterType = (
  key: string,
  property: string,
  value: string | number,
) => UpdateRepeaterActionType;
export const updateRepeater = (
  key: string,
  property: string,
  value: string | number,
): UpdateRepeaterActionType => ({
  type: REPEATER_UPDATE_REPEATER,
  key,
  property,
  value,
});
